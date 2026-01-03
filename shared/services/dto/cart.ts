import { Cart, CartItem, Ingredient, Product, ProductVariant } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & { product: Product };
  ingredients: Ingredient[];
};

export type CartResponse = Cart & {
  items: CartItemDTO[];
};
