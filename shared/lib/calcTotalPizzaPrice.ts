import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "shared/constants/pizza";


export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<number>
) => {
  const pizzaPrice = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};
