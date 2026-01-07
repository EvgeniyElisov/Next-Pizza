import { CheckoutSidebar, Container, Title, WhiteBlock } from "shared/components/shared";
import { Input, Textarea } from "shared/components/ui";

export default function CheckoutPage() {
  const totalAmount = 1000;
  const totalPrice = 2000;
  const vatPrice = 200;
  const deliveryPrice = 100;
  const submitting = false;
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">1234</WhiteBlock>
          <WhiteBlock 
            title="2. Персональная информация" 
            className={!totalAmount ? "opacity-50 pointer-events-none" : ""} 
            contentClassName="p-8"
          >
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock 
            title="3. Адрес доставки" 
            className={!totalAmount ? "opacity-50 pointer-events-none" : ""} 
            contentClassName="p-8"
          >
            <div className="flex flex-col gap-5">
              <Input name="address" className="text-base" placeholder="Адрес доставки" />
              <Textarea 
                name="comment" 
                className="text-base" 
                placeholder="Комментарий к заказу" 
                rows={5} 
              />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar 
            totalPrice={totalPrice} 
            totalAmount={totalAmount} 
            vatPrice={vatPrice} 
            deliveryPrice={deliveryPrice} 
            submitting={submitting} 
          />
        </div>
      </div>
    </Container>
  );
}
