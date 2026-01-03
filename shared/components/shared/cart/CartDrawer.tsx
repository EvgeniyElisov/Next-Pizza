"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "shared/components/ui";
import { getCartItemDetails } from "shared/lib";
import { CartDrawerItem } from "..";
import { useCartStore } from "shared/store";
import { useEffect } from "react";



export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const totalAmount = useCartStore(state => state.totalAmount);
  const items = useCartStore(state => state.items);
  const fetchCartItems = useCartStore(state => state.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={item.pizzaType && item.pizzaSize ? getCartItemDetails(item.pizzaType, item.pizzaSize, item.ingredients) : ""}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button
                // onClick={() => setRedirecting(true)}
                // loading={loading || redirecting}
                type="submit"
                className="w-full h-12 text-base"
              >
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
