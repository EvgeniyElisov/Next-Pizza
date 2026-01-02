import { ProductVariant } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { getAvailablePizzaSizes } from "shared/lib";

export const usePizzaOptions = (variants: ProductVariant[], ) =>{
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredientsIds, {toggle: toggleSelectedIngredientsIds}] = useSet(new Set<number>([]))
  const availableSizesVariants = getAvailablePizzaSizes(type, variants);

  
  useEffect(() => 
    {
    const isCurrentAvailableSize = availableSizesVariants.find((variant) => Number(variant.value) === size && !variant.disabled);
    const availableSize = availableSizesVariants.find((variant) => !variant.disabled);
    if (!isCurrentAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return { 
    size, 
    setSize, 
    type, 
    setType, 
    selectedIngredientsIds, 
    toggleSelectedIngredientsIds,
    availableSizesVariants,
  }
};
