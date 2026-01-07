import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { CheckoutDetails, WhiteBlock } from ".";

type Props = {
  totalAmount: number;
  totalPrice: number;
  vatPrice: number;
  deliveryPrice: number;
  className?: string;
  submitting?: boolean;
};

export const CheckoutSidebar = ({ totalAmount, totalPrice, vatPrice, deliveryPrice, className, submitting }: Props) => {
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
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
        value={deliveryPrice}
      />

      <Button type="submit" disabled={!totalAmount || submitting} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
