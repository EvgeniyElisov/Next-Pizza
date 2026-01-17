import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { apiClient } from "shared/services";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await apiClient.ingredients.getIngredients();
        setIngredients(ingredients);
      } catch {
        // Ошибка при загрузке ингредиентов
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
