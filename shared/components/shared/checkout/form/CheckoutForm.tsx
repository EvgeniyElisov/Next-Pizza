"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "app/serverActions";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCart } from "shared/hooks";
import { toastError, toastSuccess } from "shared/lib";
import { CheckoutAddress, CheckoutCart, CheckoutPersonalInfo, CheckoutSidebar } from ".";
import { OrderFormInputs, orderFormSchema } from "./schemas";
import { useSession } from "next-auth/react";
import { apiClient } from "shared/services";

export const CheckoutForm = () => {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler, loading, initialLoading } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<OrderFormInputs>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await apiClient.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: OrderFormInputs) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toastSuccess("Заказ успешно оформлен! 📝 Переход на страницу оплаты...");
      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Не удалось оформить заказ";
      toastError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart
              items={items}
              onClickCountButtonHandler={onClickCountButtonHandler}
              onClickRemoveCartItemHandler={onClickRemoveCartItemHandler}
              initialLoading={initialLoading}
            />
            <CheckoutPersonalInfo totalAmount={totalAmount} className={loading ? "opacity-40 pointer-events-none" : ""} />
            <CheckoutAddress totalAmount={totalAmount} className={loading ? "opacity-40 pointer-events-none" : ""} />
          </div>
          <div className="w-[450px]">
            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
