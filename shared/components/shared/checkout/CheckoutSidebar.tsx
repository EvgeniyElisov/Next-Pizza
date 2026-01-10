import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { CheckoutDetails, InfoBlock } from ".";

type Props = {
  totalAmount: number;
  submitting?: boolean;
  className?: string;
};

const VAT = 15;
const DEVIVERY_PRICE = 250;

export const CheckoutSidebar = ({ totalAmount, className, submitting }: Props) => {
  
  const vatPrice = totalAmount * VAT / 100;
  const totalPrice = totalAmount + vatPrice + DEVIVERY_PRICE;
  
  return (
    <InfoBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{totalPrice} руб.</span>
      </div>

      <CheckoutDetails
        icon={Package}
        text="Стоимость товаров"
        value={totalAmount}
      />
      <CheckoutDetails
        icon={Percent}
        text="Налоги"
        value={vatPrice}
      />
      <CheckoutDetails
        icon={Truck}
        text="Доставка"
        value={DEVIVERY_PRICE}
      />

      <Button type="submit" disabled={!totalAmount || submitting} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </InfoBlock>
  );
};
