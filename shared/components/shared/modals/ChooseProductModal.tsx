"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { ProductWithRelations } from "types/product";
import { ProductForm } from "..";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={handleBack}>
      <DialogContent className={cn("p-0 min-h-[500px] bg-white overflow-hidden w-[1060px] max-w-[1060px] sm:max-w-[1060px]", className)}>
        <ProductForm product={product} onSuccess={handleBack} />
      </DialogContent>
    </Dialog>
  );
};
