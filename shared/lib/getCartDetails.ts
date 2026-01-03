import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { CartResponse } from "shared/services/dto/cart";
import { CartStateItem } from "shared/store/cart";
import { calcCartItemTotalAmount } from ".";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
};

export const getCartDetails = (cart: CartResponse): ReturnProps => {
  const items = cart.items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      name: item.productVariant.product.name,
      imageUrl: item.productVariant.product.imageUrl,
      price: calcCartItemTotalAmount({
        productVariant: item.productVariant,
        ingredients: item.ingredients,
        quantity: item.quantity,
      }),
      pizzaSize: item.productVariant.size as PizzaSize | null,
      pizzaType: item.productVariant.pizzaType as PizzaType | null,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    };
  });

  return {
    totalAmount: cart.totalAmount,
    items,
  };
};
