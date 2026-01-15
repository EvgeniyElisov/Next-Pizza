"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, LoginFormInputs } from "./schemas";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FormField, SocialAuthButtons, Title } from "../..";
import { Button } from "shared/components/ui";
import Image from "next/image";
import { toastError, toastSuccess } from "shared/lib";

type Props = {
  onClose?: () => void;
};

export const LoginForm = ({ onClose }: Props) => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        toastError("Неверный E-Mail или пароль");
        return;
      }

      toastSuccess("Вы успешно вошли в аккаунт");
      onClose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toastError("Не удалось войти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <Image src="/assets/images/email-icon.png" alt="email-icon" width={60} height={60} />
        </div>

        <FormField 
          type="email" 
          name="email" 
          label="E-Mail" 
          placeholder="Введите вашу почту" 
          required 
        />
        <FormField 
          type="password" 
          name="password" 
          label="Пароль" 
          placeholder="Введите ваш пароль" 
          required 
        />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
        <p className="text-gray-400">Или войдите с помощью социальных сетей</p>
        <SocialAuthButtons type="login" onSwitchType={() => {}} />
      </form>
    </FormProvider>
  );
};
