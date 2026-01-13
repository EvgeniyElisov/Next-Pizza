"use client";

import { User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "shared/components/ui";

export const ProfileButton = () => {
  const { data: session } = useSession();

  return (
    <Button 
        onClick={() => session ? signOut() : signIn("github", { callbackUrl: "/", redirect: true })} 
        variant={"outline"} 
        className={"flex items-center gap-1"}
    >
      <User size={16} />
      {session ? "Выйти" : "Войти"}
    </Button>
  );
};
