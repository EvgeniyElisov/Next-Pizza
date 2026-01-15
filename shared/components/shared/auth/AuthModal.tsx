"use client";

import { useState } from "react";
import { Button, Dialog, DialogContent } from "shared/components/ui";
import { LoginForm, RegisterForm, SocialAuthButtons } from ".";

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
        {type === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}
        <hr />
        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type === "login" ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
