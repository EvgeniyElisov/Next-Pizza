import { InfoBlock } from ".";
import { FormField } from "..";

type Props = {
  totalAmount: number;
  className?: string;
};

export const CheckoutPersonalInfo = ({ totalAmount, className }: Props) => {
  return (
    <InfoBlock 
        title="2. Персональная информация" 
        className={className} 
        contentClassName="p-8"
    >
      <div className="grid grid-cols-2 gap-5">
        <FormField name="firstName" fieldType="input" placeholder="Имя" />
        <FormField name="lastName" fieldType="input" placeholder="Фамилия" />
        <FormField name="email" fieldType="input" placeholder="E-Mail" />
        <FormField name="phone" fieldType="input" placeholder="Телефон" />
      </div>  
    </InfoBlock>
  );
};
