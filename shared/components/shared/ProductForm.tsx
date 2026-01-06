"use client";

import toast from "react-hot-toast";
import { useCartStore } from "shared/store";
import { ProductWithRelations } from "types/product";
import { ChoosePizzaForm, ChooseProductForm } from ".";

type Props = {
  className?: string;
  product: ProductWithRelations;
  onSuccess?: () => void;
};

export const ProductForm = ({ className, product, onSuccess }: Props) => {

  const firstVariant = product.variants[0];
  const isPizzaForm = Boolean(firstVariant.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const addProductToCartHandler = async (variantId?: number, ingredients?: number[]) => {
    try {
      const productVariantId = variantId ?? firstVariant.id;
      await addCartItem({
        productVariantId,
        ingredients,
      });
      toast.success("Товар добавлен в корзину");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        addPizzaToCart={addProductToCartHandler}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstVariant.price}
      addProductToCart={addProductToCartHandler}
      loading={loading}
    />
  );
};
