import { Ingredient, ProductVariant } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "shared/constants/pizza";
import { calcTotalPizzaPrice } from ".";

export const getPizzaDetails = (
  type: PizzaType, 
  size: PizzaSize, 
  variants: ProductVariant[], 
  ingredients: Ingredient[], 
  selectedIngredientsIds: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredientsIds);
  const textDetails = `${mapPizzaType[type]} тесто, ${size} см`;
  return { totalPrice, textDetails };
}