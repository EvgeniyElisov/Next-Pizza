"use client";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster
        toastOptions={{
          duration: 4000,
          className: "toast-base",
          success: {
            className: "toast-success",
            iconTheme: {
              primary: "hsl(142 76% 36%)",
              secondary: "hsl(0 0% 100%)",
            },
          },
          error: {
            className: "toast-error",
            iconTheme: {
              primary: "hsl(0 84.2% 60.2%)",
              secondary: "hsl(0 0% 100%)",
            },
          },
        }}
      />
      <NextTopLoader />
    </>
  );
};
