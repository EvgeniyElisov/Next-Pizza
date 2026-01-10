import { addCartItem } from './../services/cart';
import { useEffect } from "react";
import { CreateCartItemValues } from 'shared/services/dto/cart';
import { useCartStore } from "shared/store";
import { CartStateItem } from "shared/store/cart";

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
  loading: boolean;
  initialLoading: boolean;
  addCartItem: (values: CreateCartItemValues) => void;
  onClickCountButtonHandler: (id: number, type: "plus" | "minus", quantity: number) => void;
  onClickRemoveCartItemHandler: (id: number) => void;
};

export const useCart = (): ReturnProps => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const initialLoading = useCartStore((state) => state.initialLoading);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButtonHandler = (id: number, type: "plus" | "minus", quantity: number) => {
    updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };

  const onClickRemoveCartItemHandler = (id: number) => {
    removeCartItem(id);
  };

  return { 
    items, 
    totalAmount, 
    loading,
    initialLoading,
    addCartItem,
    onClickCountButtonHandler,
    onClickRemoveCartItemHandler
  };
};
