import { ProductVariant } from "@prisma/client";
import { Variant } from "shared/components/shared/GroupVariants";
import { pizzaSizes, PizzaType } from "shared/constants/pizza";

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const variantsForSelectedType = variants.filter((variant) => variant.pizzaType === type);
  const availableSizesVariants = pizzaSizes.map((sizeOption) => {
    const sizeValue = Number(sizeOption.value);
    const isSizeAvailable = variantsForSelectedType.some((variant) => variant.size === sizeValue);

    return {
      name: sizeOption.name,
      value: sizeOption.value,
      disabled: !isSizeAvailable,
    };
  });

  return availableSizesVariants;
};
