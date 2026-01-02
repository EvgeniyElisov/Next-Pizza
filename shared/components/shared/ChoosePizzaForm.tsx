"use client";

import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType, pizzaTypes } from "shared/constants/pizza";
import { usePizzaOptions } from "shared/hooks";
import { getPizzaDetails } from "shared/lib";
import { cn } from "shared/lib/utils";
import { GroupVariants, IngredientItem, PizzaImage, Title } from ".";
import { Button } from "../ui";

type Props = {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onClickAdd: () => void;
};

export const ChoosePizzaForm = ({ 
    name, 
    variants, 
    imageUrl, 
    ingredients, 
    onClickAdd, 
    className }: Props) => {


  const { 
    size, 
    type, 
    setSize, 
    setType, 
    selectedIngredientsIds, 
    toggleSelectedIngredientsIds,
    availableSizesVariants,
  } = usePizzaOptions(variants);
  

  const { totalPrice, textDetails } = getPizzaDetails(type, size, variants, ingredients, selectedIngredientsIds);

  
  const onClickAddHandler = () => {
    // TODO
    onClickAdd();
  }
  

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage src={imageUrl} alt={name} size={size} />

      <div className="w-[490px] bg-form-bg p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className={'flex flex-col gap-3 mt-5 mb-8'}>
          <GroupVariants 
            items={availableSizesVariants} 
            value={String(size)} 
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
            <GroupVariants 
            items={pizzaTypes} 
            value={String(type)} 
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className={"grid grid-cols-3 gap-3"}>
            {ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id} 
                name={ingredient.name} 
                price={ingredient.price} 
                imageUrl={ingredient.imageUrl} 
                onClick={() => toggleSelectedIngredientsIds(ingredient.id)}
                active={selectedIngredientsIds.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button 
        // loading={loading} 
        onClick={onClickAddHandler} 
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
