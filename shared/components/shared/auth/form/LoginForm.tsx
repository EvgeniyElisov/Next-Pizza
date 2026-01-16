"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { toastError, toastSuccess } from "shared/lib";
import { FormField, SocialAuthButtons, SubmitButton, Title } from "../..";
import { formLoginSchema, LoginFormInputs } from "./schemas";

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
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 mr-4">
            <Title text="Вход в аккаунт" size="md" className="font-bold mb-2" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
            <Image 
              src="/assets/images/email-icon.png" 
              alt="email-icon" 
              width={64} 
              height={64}
              className="relative z-10 drop-shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-5">
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
        </div>

        <SubmitButton 
          isSubmitting={form.formState.isSubmitting} 
          className="h-12 text-base font-semibold shadow-md hover:shadow-lg transition-shadow mt-2"
        >
          Войти
        </SubmitButton>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground">Или войдите с помощью</span>
          </div>
        </div>

        <SocialAuthButtons />
      </form>
    </FormProvider>
  );
};
