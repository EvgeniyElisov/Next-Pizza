import { notFound } from "next/navigation";
import { prisma } from "prisma/prisma";
import { Container, ProductForm } from "shared/components/shared";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className={"flex flex-col mt-10 mb-10"}>
      <ProductForm product={product} />
    </Container>
  );
}
