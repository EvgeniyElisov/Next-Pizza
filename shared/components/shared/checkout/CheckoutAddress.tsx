import { InfoBlock } from ".";
import { FormField } from "../form";

type Props = {
  totalAmount: number;
  className?: string;
};

export const CheckoutAddress = ({ totalAmount, className }: Props) => {
  return (
    <InfoBlock 
      title="3. Адрес доставки" 
      className={className} 
      contentClassName="p-8"
    >
      <div className="flex flex-col gap-5">
        <FormField name="address" fieldType="address" placeholder="Адрес" />
        <FormField name="comment" fieldType="textarea" placeholder="Комментарий к заказу" />
      </div>
    </InfoBlock>
  );
};
