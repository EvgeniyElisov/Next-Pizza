"use server";

import { OrderStatus } from "@prisma/client";
import { prisma } from "prisma/prisma";
import { OrderFormInputs } from "shared/components/shared/checkout/schemas/orderFormSchema";

export async function createOrder(data: OrderFormInputs) {

  const token = "123";

  await prisma.order.create({
    data: {
      token: token,
      totalAmount: 800,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.firstName + " " + data.lastName,
      address: data.address,
      email: data.email,
      phone: data.phone,
      comment: data.comment,
    },
  });
}
