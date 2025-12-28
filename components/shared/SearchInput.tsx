"use client";

import { cn } from "lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiClient } from "services";
import { Product } from "@prisma/client";
import { useDebounce } from "react-use";

type Props = {
  className?: string;
};

export const SearchInput = ({ className }: Props) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useDebounce(
    () => {
      apiClient.products.search(searchQuery).then((products) => setProducts(products));
    },
    500,
    [searchQuery]
  );

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  const onClickItemHandler = () => {
    setProducts([]);
    setSearchQuery("");
  };

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchQuery}
          onChange={searchHandler}
        />
        <div
          className={cn(
            "absolute w-full min-h-10 bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {searchQuery && products.length === 0 ? (
            <span className="block px-3 py-2 text-gray-500 text-center w-full">Ничего не найдено</span>
          ) : (
            products.map((product) => (
              <Link
                onClick={onClickItemHandler}
                key={product.id}
                className={"flex items-center gap-3 px-3 py-2 hover:bg-primary/10"}
                href={`/product/${product.id}`}
              >
                <Image className={"rounded-sm"} src={product.imageUrl} alt={product.name} width={40} height={40} />
                <span>{product.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};
