import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";

export type PriceFilterType = {
  priceFrom?: number;
  priceTo?: number;
};

export type FiltersType = {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredientIds: Set<string>;
  price: PriceFilterType;
};

type ReturnFiltersType = FiltersType & {
  setPrice: (name: keyof PriceFilterType, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredientIds: (value: string) => void;
};

export const useFilters = (): ReturnFiltersType => {
  const searchParams = useSearchParams();
  const [selectedIngredientIds, { toggle: toggleSelectedIngredientIds }] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",")));
  const [price, setPrice] = useState<PriceFilterType>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get("sizes")?.split(",")));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(",")));

  const handlePriceChange = (name: keyof PriceFilterType, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sizes,
    pizzaTypes,
    price,
    selectedIngredientIds,
    setPrice: handlePriceChange,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredientIds: toggleSelectedIngredientIds,
  };
};
