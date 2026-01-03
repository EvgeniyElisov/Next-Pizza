import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "shared/constants/pizza";
import { CartStateItem } from "shared/store/cart";

export const getCartItemDetails = (
  pizzaType: PizzaType, 
  pizzaSize: PizzaSize, 
  ingredients: CartStateItem["ingredients"]
) => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} тесто, ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
