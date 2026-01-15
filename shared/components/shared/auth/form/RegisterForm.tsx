"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "shared/components/ui";
import { FormField } from "../..";
import { formRegisterSchema, RegisterFormInputs } from "./schemas";

type Props = {
  onClose?: () => void;
  onClickLogin?: () => void;
};

export const RegisterForm = ({ onClose, onClickLogin }: Props) => {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // await registerUser({
      //   email: data.email,
      //   fullName: data.fullName,
      //   password: data.password,
      // });

      toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Неверный E-Mail или пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          type="email" 
          name="email" 
          label="E-Mail" 
          placeholder="Введите вашу почту" 
          required 
        />
        <FormField 
          type="text" 
          name="fullName" 
          label="Полное имя" 
          placeholder="Введите ваше полное имя" 
          required 
        />
        <FormField 
          type="password" 
          name="password" 
          label="Пароль" 
          placeholder="Введите ваш пароль" 
          required 
        />
        <FormField 
          type="password" 
          name="confirmPassword" 
          label="Подтвердите пароль"
          placeholder="Подтвердите ваш пароль" 
          required 
        />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
