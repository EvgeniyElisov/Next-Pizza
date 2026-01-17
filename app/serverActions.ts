"use server";

import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "prisma/prisma";
import { PayOrderTemplate, VerifyUserTemplate } from "shared/lib/email-templates";
import { OrderFormInputs } from "features/checkout/components/form/schemas/orderFormSchema";
import { getUserSession, sendEmail } from "shared/lib";

export async function createOrder(data: OrderFormInputs) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cartToken")?.value;

    if (!token) {
      throw new Error("Токен корзины не найден");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      },
    });

    if (!userCart) {
      throw new Error("Корзина не найдена");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Корзина пуста");
    }

    const order = await prisma.order.create({
      data: {
        token,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO: Интеграция с payment сервисом будет добавлена в будущих версиях

    await sendEmail(
      data.email,
      `Ваш заказ №${order.id} успешно оформлен!`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "localhost:3000/checkout/payment",
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Не удалось оформить заказ");
  }

  return "/checkout/payment";
}

type UpdateUserInfoBody = {
  email: string;
  fullName: string;
  password?: string;
};

export async function updateUserInfo(body: UpdateUserInfoBody) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не авторизован");
    }

    const updateData: Prisma.UserUpdateInput = {
      fullName: body.fullName,
      email: body.email,
    };

    if (body.password && body.password.length > 0) {
      updateData.password = hashSync(body.password, 10);
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: updateData,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Не удалось обновить данные пользователя");
  }
}

type RegisterUserBody = {
  email: string;
  fullName: string;
  password: string;
};

export async function registerUser(body: RegisterUserBody) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Пользователь не подтвердил свою почту. Проверьте почту для подтверждения регистрации");
      }
      throw new Error("Пользователь с такой почтой уже существует");
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        userId: newUser.id,
        code,
      },
    });

    await sendEmail(
      newUser.email,
      "Подтверждение регистрации",
      VerifyUserTemplate({
        code,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Не удалось зарегистрировать пользователя");
  }
}
