import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { getCartItemDetails } from "shared/lib";
import { CartStateItem } from "shared/store/cart";
import { InfoBlock, Item, ItemSkeleton } from ".";

type Props = {
  items: CartStateItem[];
  onClickCountButtonHandler: (id: number, type: "plus" | "minus", quantity: number) => void;
  onClickRemoveCartItemHandler: (id: number) => void;
  initialLoading: boolean;
  className?: string;
};

export const CheckoutCart = ({ items, onClickCountButtonHandler, onClickRemoveCartItemHandler, className, initialLoading }: Props) => {
  return (
    <InfoBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {initialLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)
          : items.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButtonHandler(item.id, type, item.quantity)}
                onClickRemoveCartItem={() => onClickRemoveCartItemHandler(item.id)}
                details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
              />
            ))}
      </div>
    </InfoBlock>
  );
};
