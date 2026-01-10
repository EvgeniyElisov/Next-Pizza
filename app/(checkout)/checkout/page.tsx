"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { 
  CheckoutAddress, 
  CheckoutCart, 
  CheckoutPersonalInfo, 
  CheckoutSidebar, 
  Container, 
  Title 
} from "shared/components/shared";
import { OrderFormInputs, orderFormSchema } from "shared/components/shared/checkout/schemas/orderFormSchema";
import { useCart } from "shared/hooks";

export default function CheckoutPage() {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler, loading, initialLoading } = useCart();

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

  const onSubmit = (data: OrderFormInputs) => {
    console.log(data);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
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
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
