import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { CheckoutDetails, InfoBlock } from ".";

type Props = {
  totalAmount: number;
  loading?: boolean;
  className?: string;
};

const VAT = 15;
const DEVIVERY_PRICE = 250;

export const CheckoutSidebar = ({ totalAmount, className, loading }: Props) => {
  
  const vatPrice = totalAmount * VAT / 100;
  const totalPrice = totalAmount + vatPrice + DEVIVERY_PRICE;
  
  return (
    <InfoBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {
          loading 
           ? <Skeleton className="h-11 w-48 bg-gray-200 rounded-[8px] animate-pulse" />
           : <span className="h-11 text-[34px] font-extrabold">{totalPrice} руб.</span>          
        }
      </div>

      <CheckoutDetails
        icon={Package}
        text="Стоимость товаров"
        value={loading ? <Skeleton className="h-6 w-24 bg-gray-200 rounded-[8px] animate-pulse" /> : `${totalAmount} руб.`}
      />
      <CheckoutDetails
        icon={Percent}
        text="Налоги"
        value={loading ? <Skeleton className="h-6 w-24 bg-gray-200 rounded-[8px] animate-pulse" /> : `${vatPrice} руб.`}
      />
      <CheckoutDetails
        icon={Truck}
        text="Доставка"
        value={loading ? <Skeleton className="h-6 w-24 bg-gray-200 rounded-[8px] animate-pulse" /> : `${DEVIVERY_PRICE} руб.`}
      />

      <Button type="submit" disabled={!totalAmount} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </InfoBlock>
  );
};
