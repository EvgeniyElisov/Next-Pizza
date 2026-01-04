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
        OR: [
          {
            token,
          },
        ],
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
  } catch (error) {
    console.error("[CART_GET] Server error: ", error);
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

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            },
          },
        },
      },
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
  } catch (error) {
    console.error("[CART_POST] Server error: ", error);
    return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
  }
}
