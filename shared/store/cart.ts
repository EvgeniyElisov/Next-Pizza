import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { getCartDetails, toastError, toastSuccess } from "shared/lib";
import { apiClient } from "shared/services";
import { CreateCartItemValues } from "shared/services/dto/cart";
import { create } from "zustand";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled: boolean;
  pizzaSize?: PizzaSize | null;
  pizzaType?: PizzaType | null;
  ingredients: Array<{ name: string; price: number }>;
};

export type State = {
  loading: boolean;
  initialLoading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export const useCartStore = create<State>((set, get) => ({
  loading: true,
  initialLoading: true,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, initialLoading: true, error: false });
      const data = await apiClient.cart.getCart();
      set({ ...getCartDetails(data), initialLoading: false });
    } catch {
      set({ error: true, initialLoading: false });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await apiClient.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch {
      set({ error: true });
      toastError("Не удалось обновить количество товара");
    } finally {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: false } : item)),
      }));
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await apiClient.cart.removeCartItem(id);
      set(getCartDetails(data));
      toastSuccess("Товар удален из корзины");
    } catch {
      set({ error: true });
      toastError("Не удалось удалить товар из корзины");
    } finally {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: false } : item)),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await apiClient.cart.addCartItem(values);
      set(getCartDetails(data));
      toastSuccess("Товар добавлен в корзину");
    } catch {
      set({ error: true });
      toastError("Не удалось добавить товар в корзину");
    } finally {
      set({ loading: false });
    }
  },
}));
