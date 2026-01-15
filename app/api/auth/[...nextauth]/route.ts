import { UserRole } from "@prisma/client";
import { compare, hashSync } from "bcrypt";
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { prisma } from "prisma/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const user = await prisma.user.findUnique({
          where: values,
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        if (!user.verified) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      if (!token.email) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },

    async signIn({
      user,
      account,
    }: {
      user: { id: string; email?: string | null; name?: string | null };
      account: { provider?: string | null; providerAccountId?: string | null } | null;
    }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ provider: account?.provider, providerId: account?.providerAccountId }, { email: user.email }],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.log("Error [SIGN IN]", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
