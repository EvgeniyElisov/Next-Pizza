import { NextRequest, NextResponse } from "next/server";
import { prisma } from "prisma/prisma";
import crypto from "crypto";
import { findOrCreateCart } from "shared/lib/findOrCreateCart";
import { CreateCartItemValues } from "shared/services/dto/cart";
import { updateCartTotalAmount } from "shared/lib/updateCartTotalAmount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch {
    return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as CreateCartItemValues;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const cartItemsWithSameVariant = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
      },
      include: {
        ingredients: true,
      },
    });

    const sortedNewIngredients = (data.ingredients || []).sort((a, b) => a - b);
    const findCartItem = cartItemsWithSameVariant.find((item) => {
      const sortedItemIngredients = item.ingredients
        .map((ing) => ing.id)
        .sort((a, b) => a - b);
      
      if (sortedItemIngredients.length !== sortedNewIngredients.length) {
        return false;
      }
      
      return sortedItemIngredients.every(
        (id, index) => id === sortedNewIngredients[index]
      );
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((ingredient) => ({ id: ingredient })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", token);
    return response;
  } catch {
    return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
  }
}
