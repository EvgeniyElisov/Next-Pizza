import { GetSearchParams } from "lib/findPizzas";
import { getSearchParams } from "lib/getSearchParams";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "prisma/prisma";

export async function GET(req: NextRequest) {
  const params = getSearchParams<GetSearchParams>(req.url);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: params.query,
        mode: "insensitive",
      },
    },
    take: 5,
  });
  return NextResponse.json(products);
}
