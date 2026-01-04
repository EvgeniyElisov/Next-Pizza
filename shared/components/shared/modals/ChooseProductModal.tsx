"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { useCartStore } from "shared/store";
import { ProductWithRelations } from "types/product";
import { ChoosePizzaForm, ChooseProductForm } from "..";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const firstVariant = product.variants[0];
  const isPizzaForm = Boolean(firstVariant.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);


  const addProductToCartHandler = async (productVariantId: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productVariantId,
        ingredients,
      });
      toast.success("Товар добавлен в корзину");
      back();
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить товар в корзину");
    }
  }

  const back = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={back}>
      <DialogContent className={cn("p-0 min-h-[500px] bg-white overflow-hidden w-[1060px]! max-w-[1060px]! sm:max-w-[1060px]!", className)}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            addPizzaToCart={(productVariantId, ingredients) => addProductToCartHandler(productVariantId, ingredients)}
            loading={loading}
          />
        ) : (
          <ChooseProductForm 
            imageUrl={product.imageUrl} 
            name={product.name} 
            price={firstVariant.price} 
            addProductToCart={() => addProductToCartHandler(firstVariant.id)} 
            loading={loading} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
