import { InfoBlock } from "..";
import { FormField } from "../..";

type Props = {
  totalAmount: number;
  className?: string;
};

export const CheckoutAddress = ({ totalAmount, className }: Props) => {
  return (
    <InfoBlock title="3. Адрес доставки" className={className} contentClassName="p-8">
      <div className="flex flex-col gap-5">
        <FormField 
          type="text" 
          name="address" 
          fieldType="address" 
          placeholder="Введите ваш адрес" 
          label="Адрес" 
          required 
        />
        <FormField 
          type="textarea" 
          name="comment" 
          fieldType="textarea" 
          placeholder="Введите ваш комментарий" 
          label="Комментарий к заказу" 
        />
      </div>
    </InfoBlock>
  );
};
