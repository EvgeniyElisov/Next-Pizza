import { Product } from "@prisma/client";

type Props = {
  product: Product;
}

export const ChooseProductModal = ({ product }: Props) => {
  return (
    <div>{product.name}</div>
  )
}
