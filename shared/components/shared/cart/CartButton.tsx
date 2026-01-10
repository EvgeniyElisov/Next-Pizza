"use client";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { CartDrawer } from ".";
import { useCartStore } from "shared/store";

type Props = {
  className?: string;
};

export const CartButton = ({ className }: Props) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
  return (
    <CartDrawer>
      <Button loading={loading} className={cn("group relative", { "w-[105px]": loading }, className)}>
        <b>{totalAmount} руб.</b>
        <span className={"h-full w-px bg-white/30 mx-3"} />
        <div className={"flex items-center gap-1 transition duration-300 group-hover:opacity-0"}>
          <ShoppingCart size={16} className={"relative"} strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className={"absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 "}
          strokeWidth={2}
        />
      </Button>
    </CartDrawer>
  );
};
