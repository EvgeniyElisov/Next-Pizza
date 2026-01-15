"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button, Dialog, DialogContent } from "shared/components/ui";
import { LoginForm, RegisterForm } from ".";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
    setType("login");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" 
          ? <LoginForm onClose={handleClose} /> 
          : <RegisterForm onClose={handleClose} />
        }
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => signIn("github", {callbackUrl: "/",redirect: true})}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image 
              width={32} 
              height={32} 
              src="https://github.githubassets.com/favicons/favicon.svg" 
              alt="GitHub" 
            />
            <span>GitHub</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => signIn("google", {callbackUrl: "/",redirect: true})}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image 
              width={32} 
              height={32} 
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
              alt="Google" 
            />
            <span>Google</span>
          </Button>
        </div>
        <Button 
          variant="outline" 
          onClick={onSwitchType} 
          type="button" 
          className="h-12"
        >
          {type === "login" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
