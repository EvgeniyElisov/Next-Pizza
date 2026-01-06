import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const searchParamsKey = useMemo(() => searchParams.toString(), [searchParams]);

  const parseSetParam = (name: string) => {
    const value = searchParams.get(name);
    return new Set<string>(value?.split(",").filter(Boolean));
  };

  const parsePrice = () => ({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Set<string>>(parseSetParam("ingredients"));
  const [price, setPrice] = useState<PriceFilterType>(parsePrice);
  const [sizes, setSizes] = useState<Set<string>>(parseSetParam("sizes"));
  const [pizzaTypes, setPizzaTypes] = useState<Set<string>>(parseSetParam("pizzaTypes"));

  useEffect(() => {
    setSelectedIngredientIds(parseSetParam("ingredients"));
    setSizes(parseSetParam("sizes"));
    setPizzaTypes(parseSetParam("pizzaTypes"));
    setPrice(parsePrice());
  }, [searchParamsKey]);

  const toggleSetValue = (setState: React.Dispatch<React.SetStateAction<Set<string>>>) => (value: string) =>
    setState((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const handlePriceChange = (name: keyof PriceFilterType, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sizes,
    pizzaTypes,
    price,
    selectedIngredientIds,
    setPrice: handlePriceChange,
    setPizzaTypes: toggleSetValue(setPizzaTypes),
    setSizes: toggleSetValue(setSizes),
    setSelectedIngredientIds: toggleSetValue(setSelectedIngredientIds),
  };
};
