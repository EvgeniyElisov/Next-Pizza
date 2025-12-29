import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiltersType } from "./useFIlters";
import qs from "qs";

export const useQueryFilters = (filters: FiltersType) => {
  const router = useRouter();
  const [prevQuery, setPrevQuery] = useState<string>("");

  useEffect(() => {
    const params = {
      ...filters.price,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredientIds),
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    if (prevQuery !== query) {
      setPrevQuery(query);
      router.push(`?${query}`, { scroll: false });
    }
  }, [filters]);
};
