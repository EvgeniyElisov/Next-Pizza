import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { apiClient } from "services";

type Ingredients = {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  toggleId: (id: string) => void;
};

export const useFilterIngredients = (): Ingredients => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await apiClient.ingredients.getIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, loading, selectedIngredients, toggleId: toggle };
};
