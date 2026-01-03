import { Ingredient, ProductVariant } from "@prisma/client";

type Item = {
  productVariant: ProductVariant;
  ingredients: Ingredient[];
  quantity: number;
};

export const calcCartItemTotalAmount = (item: Item): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  return (item.productVariant.price + ingredientsPrice) * item.quantity;
};
