import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { getCartDetails } from "shared/lib";
import { apiClient } from "shared/services";
import { create } from "zustand";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: PizzaSize | null;
  pizzaType?: PizzaType | null;
  ingredients: Array<{ name: string; price: number }>;
};

export type CartState = {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  loading: true,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await apiClient.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
  // updateItemQuantity: async (id: number, quantity: number) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.updateItemQuantity(id, quantity);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     console.error(error);
  //     set({ error: true });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  // addCartItem: async (values: CreateCartItemValues) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.addCartItem(values);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     console.error(error);
  //     set({ error: true });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  // removeCartItem: async (id: number) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.removeCartItem(id);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     set({ error: true });
  //     console.error(error);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));
