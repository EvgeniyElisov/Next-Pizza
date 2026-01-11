import { z } from "zod";

export const orderFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "Поле обязательно для заполнения" })
    .min(2, { error: "Имя должно содержать минимум 2 символа" })
    .max(50, { error: "Имя не должно превышать 50 символов" })
    .regex(/^[а-яА-ЯёЁ]+$/, { error: "Можно использовать только русские буквы" }),
  lastName: z
    .string()
    .trim()
    .min(1, { error: "Поле обязательно для заполнения" })
    .min(2, { error: "Фамилия должна содержать минимум 2 символа" })
    .max(50, { error: "Фамилия не должна превышать 50 символов" })
    .regex(/^[а-яА-ЯёЁ]+$/, { error: "Можно использовать только русские буквы" }),
  email: z.email({ error: "Некорректный email" }),
  phone: z
    .string()
    .trim()
    .min(1, { error: "Поле обязательно для заполнения" })
    .regex(
      /^\+375\s?\(?(29|33|44|25)\)?\s?(\d{3})[- ]?(\d{2})[- ]?(\d{2})$/,
      { error: "Некорректный номер телефона. Формат: +375 XX XXXXXXX" }
    ),
  address: z
    .string()
    .trim()
    .min(1, { error: "Поле обязательно для заполнения" })
    .min(5, { error: "Адрес должен содержать минимум 5 символов" })
    .max(200, { error: "Адрес не должен превышать 200 символов" }),
  comment: z
    .string()
    .trim()
    .max(500, { error: "Комментарий не должен превышать 500 символов" })
    .optional()
});

export type OrderFormInputs = z.infer<typeof orderFormSchema>;