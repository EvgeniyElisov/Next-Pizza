'use client';

import Image from 'next/image';
import { cn } from 'shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  className?: string;
  addProductToCart: () => void;
  loading: boolean;
}

export const ChooseProductForm = ({
  name,
  imageUrl,
  price,
  addProductToCart,
  className,
  loading,
}: Props) => {
 
  const addProductToCartHandler = () => {
    addProductToCart();
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300"
          width={350}
          height={350}
        />
      </div>

      <div className="w-[490px] bg-form-bg p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={addProductToCartHandler}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} руб.
        </Button>
      </div>
    </div>
  );
};
