import { z } from "zod";

export const passwordSchema = z.string().min(1, { error: "Пароль обязателен для заполнения" }).min(5, { error: "Пароль должен содержать минимум 8 символов" });

export const formLoginSchema = z.object({
  email: z.email({ error: "Некорректный email" }),
  password: passwordSchema,
});

export type LoginFormInputs = z.infer<typeof formLoginSchema>;
