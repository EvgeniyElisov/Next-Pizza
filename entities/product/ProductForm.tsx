"use client";

import { toastSuccess } from "shared/lib";
import { useCartStore } from "shared/store";
import { ProductWithRelations } from "shared/types/product";
import { ChoosePizzaForm } from "entities/product/ChoosePizzaForm";
import { ChooseProductForm } from "entities/product/ChooseProductForm";

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
      onSuccess?.();
    } catch {
      // Ошибка обрабатывается в store
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
