"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { Button, Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "shared/components/ui";
import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { useCart } from "shared/hooks";
import { getCartItemDetails, getProductInCorrectCase } from "shared/lib";
import { cn } from "shared/lib/utils";
import { CartDrawerItem, Title } from "..";

export const CartDrawer = ({ children }: PropsWithChildren) => {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler, loading } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-page-bg">
        <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине <span className="font-bold">{items.length} {getProductInCorrectCase(items.length)}</span>
              </SheetTitle>
            </SheetHeader>
          )}
          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы один товар, чтобы совершить заказ</p>

              <Button asChild className="w-56 h-12 text-base" size="lg">
                <SheetClose >
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </SheetClose>
              </Button>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={item.price}
                      disabled={item.disabled}
                      quantity={item.quantity}
                      details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                      onClickCountButton={(type) => onClickCountButtonHandler(item.id, type, item.quantity)}
                      onClickRemoveCartItem={() => onClickRemoveCartItemHandler(item.id)}
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

                    <span className="font-bold text-lg">{totalAmount} руб.</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={loading || redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
