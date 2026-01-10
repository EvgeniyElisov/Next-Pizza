'use client';

import { cn } from "shared/lib/utils";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo, CountButton } from "../cart";
import { CartItemProps } from "../cart/cart-item-details/types";
import { X } from "lucide-react";

type Props = CartItemProps & {
  onClickRemoveCartItem: () => void;
  onClickCountButton: (type: "plus" | "minus") => void;
  className?: string;
}

export const Item= ({
  name,
  price,
  imageUrl,
  quantity,
  disabled,
  details,
  className,
  onClickCountButton,
  onClickRemoveCartItem,
}: Props) => {
  return (
    <div className={cn('flex items-center justify-between', { "opacity-50 pointer-events-none": disabled }, className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemoveCartItem}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
