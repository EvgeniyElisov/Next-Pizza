import { OrderStatus } from "@prisma/client";
import { hashSync } from "bcrypt";
import { randomUUID } from "crypto";
import { prisma } from "./prisma";
import {
  USERS_DATA,
  CATEGORIES_DATA,
  INGREDIENTS_DATA,
  PRODUCTS_DATA,
  PIZZAS_DATA,
  STORIES_DATA,
  TABLES_TO_CLEAR,
} from "./constants";
import { generateProductVariant } from "./utils";


const seedUsers = async (): Promise<number[]> => {
  const users = await prisma.user.createMany({
    data: USERS_DATA.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      password: hashSync(user.password, 10),
      verified: new Date(),
      role: user.role,
    })),
  });

  const createdUsers = await prisma.user.findMany({
    where: {
      email: {
        in: USERS_DATA.map((u) => u.email),
      },
    },
    select: { id: true },
  });

  return createdUsers.map((u) => u.id);
};


const seedCategories = async (): Promise<Map<string, number>> => {
  await prisma.category.createMany({
    data: CATEGORIES_DATA,
  });

  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: CATEGORIES_DATA.map((c) => c.name),
      },
    },
  });

  return new Map(categories.map((cat) => [cat.name, cat.id]));
};

const seedIngredients = async (): Promise<number[]> => {
  await prisma.ingredient.createMany({
    data: INGREDIENTS_DATA,
  });

  const ingredients = await prisma.ingredient.findMany({
    orderBy: { id: "asc" },
  });

  return ingredients.map((ing) => ing.id);
};

const seedProducts = async (categoryMap: Map<string, number>): Promise<number[]> => {
  const productsData = PRODUCTS_DATA.filter((product) => {
    const categoryId = categoryMap.get(product.categoryName);
    if (!categoryId) {
      console.warn(`Категория "${product.categoryName}" не найдена для продукта "${product.name}"`);
      return false;
    }
    return true;
  });

  const products = await prisma.product.createMany({
    data: productsData.map((product) => ({
      name: product.name,
      imageUrl: product.imageUrl,
      categoryId: categoryMap.get(product.categoryName)!,
    })),
  });

  const createdProducts = await prisma.product.findMany({
    where: {
      name: {
        in: productsData.map((p) => p.name),
      },
    },
    orderBy: { id: "asc" },
    select: { id: true },
  });

  return createdProducts.map((p) => p.id);
};

const seedProductVariants = async (productIds: number[]): Promise<void> => {
  for (const productId of productIds) {
    await prisma.productVariant.create({
      data: generateProductVariant({
        productId,
      }),
    });
  }
};

const seedPizzas = async (
  categoryMap: Map<string, number>,
  ingredientIds: number[]
): Promise<{ pizzaId: number; productVariantIds: number[] }[]> => {
  const pizzaResults = [];

  for (const pizza of PIZZAS_DATA) {
    const categoryId = categoryMap.get(pizza.categoryName);
    if (!categoryId) {
      console.warn(`Категория "${pizza.categoryName}" не найдена для пиццы "${pizza.name}"`);
      continue;
    }

    if (pizza.ingredientIndices.length < 2) {
      console.warn(`Неверные индексы ингредиентов для пиццы "${pizza.name}"`);
      continue;
    }

    const ingredientSlice = ingredientIds.slice(pizza.ingredientIndices[0], pizza.ingredientIndices[1]);

    const createdPizza = await prisma.product.create({
      data: {
        name: pizza.name,
        imageUrl: pizza.imageUrl,
        categoryId,
        ingredients: {
          connect: ingredientSlice.map((id) => ({ id })),
        },
      },
    });

    const productVariants = await prisma.productVariant.createMany({
      data: pizza.variants.map((variant) =>
        generateProductVariant({
          productId: createdPizza.id,
          pizzaType: variant.pizzaType,
          size: variant.size,
        })
      ),
    });

    const createdProductVariants = await prisma.productVariant.findMany({
      where: {
        productId: createdPizza.id,
      },
      select: { id: true },
      orderBy: { id: "asc" },
    });

    pizzaResults.push({
      pizzaId: createdPizza.id,
      productVariantIds: createdProductVariants.map((item: { id: number }) => item.id),
    });
  }

  return pizzaResults;
};



const seedCarts = async (userIds: number[]): Promise<Map<number, number>> => {
  const carts = await prisma.cart.createMany({
    data: userIds.map((userId) => ({
      userId,
      token: randomUUID(),
      totalAmount: 0,
    })),
  });

  const createdCarts = await prisma.cart.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: { id: true, userId: true },
  });

  return new Map(createdCarts.map((cart) => [cart.userId!, cart.id]));
};

const seedCartItems = async (cartMap: Map<number, number>, ingredientIds: number[]): Promise<void> => {
  const cartIds = Array.from(cartMap.values());
  const firstCartId = cartIds[0];
  
  if (!firstCartId) return;

  const firstProductVariant = await prisma.productVariant.findFirst({
    orderBy: { id: "asc" },
    select: { id: true, pizzaType: true },
  });

  if (!firstProductVariant) return;

  const isFirstPizza = firstProductVariant.pizzaType !== null;
  
  await prisma.cartItem.create({
    data: {
      productVariantId: firstProductVariant.id,
      cartId: firstCartId,
      quantity: 2,
      ...(isFirstPizza && {
        ingredients: {
          connect: ingredientIds.slice(0, 3).map((id) => ({ id })),
        },
      }),
    },
  });

  const secondCartId = cartIds[1];
  const secondProductVariant = await prisma.productVariant.findFirst({
    skip: 1,
    orderBy: { id: "asc" },
    select: { id: true, pizzaType: true },
  });

  if (secondCartId && secondProductVariant) {
    const isSecondPizza = secondProductVariant.pizzaType !== null;
    
    await prisma.cartItem.create({
      data: {
        productVariantId: secondProductVariant.id,
        cartId: secondCartId,
        quantity: 1,
        ...(isSecondPizza && {
          ingredients: {
            connect: ingredientIds.slice(3, 5).map((id) => ({ id })),
          },
        }),
      },
    });
  }

  // Добавляем пиццу с ингредиентами для первого пользователя
  const pizzaVariant = await prisma.productVariant.findFirst({
    where: {
      pizzaType: {
        not: null,
      },
    },
    orderBy: { id: "asc" },
    select: { id: true },
  });

  if (firstCartId && pizzaVariant) {
    await prisma.cartItem.create({
      data: {
        productVariantId: pizzaVariant.id,
        cartId: firstCartId,
        quantity: 1,
        ingredients: {
          connect: ingredientIds.slice(0, 4).map((id) => ({ id })),
        },
      },
    });
  }
};

const seedOrders = async (userIds: number[]): Promise<void> => {
  if (userIds.length < 2) return;

  const productVariants = await prisma.productVariant.findMany({
    take: 3,
    select: { id: true, price: true },
  });

  if (productVariants.length === 0) return;

  const orderItems = productVariants.map((pv: { id: number; price: number }) => ({
    productVariantId: pv.id,
    quantity: Math.floor(Math.random() * 3) + 1,
    price: pv.price,
  }));

  const totalAmount = orderItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  await prisma.order.create({
    data: {
      userId: userIds[0],
      token: randomUUID(),
      items: orderItems,
      status: OrderStatus.PENDING,
      totalAmount,
      fullName: "Иван Иванов",
      address: "ул. Ленина, д. 10, кв. 5",
      email: "user@test.ru",
      phone: "+7 (999) 123-45-67",
      comment: "Позвоните за 10 минут до доставки",
    },
  });

  const secondOrderItems = orderItems.slice(0, 2);
  const secondOrderTotalAmount = secondOrderItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  await prisma.order.create({
    data: {
      userId: userIds[0],
      token: randomUUID(),
      items: secondOrderItems,
      status: OrderStatus.SUCCEEDED,
      totalAmount: secondOrderTotalAmount,
      paymentId: randomUUID(),
      fullName: "Иван Иванов",
      address: "ул. Ленина, д. 10, кв. 5",
      email: "user@test.ru",
      phone: "+7 (999) 123-45-67",
    },
  });

  await prisma.order.create({
    data: {
      userId: userIds[1],
      token: randomUUID(),
      items: orderItems,
      status: OrderStatus.CANCELLED,
      totalAmount,
      fullName: "Админ Админов",
      address: "пр. Мира, д. 25, офис 100",
      email: "admin@test.ru",
      phone: "+7 (999) 765-43-21",
      comment: "Отменен по просьбе клиента",
    },
  });
};

const seedStories = async (): Promise<void> => {
  for (const story of STORIES_DATA) {
    const createdStory = await prisma.story.create({
      data: {
        previewImageUrl: story.previewImageUrl,
      },
    });

    if (story.items.length > 0) {
      await prisma.storyItem.createMany({
        data: story.items.map((sourceUrl) => ({
          storyId: createdStory.id,
          sourceUrl,
        })),
      });
    }
  }
};

const seedDatabase = async (): Promise<void> => {
  console.log("🌱 Начало заполнения базы данных...");

  const userIds = await seedUsers();
  console.log("✅ Пользователи созданы");

  const categoryMap = await seedCategories();
  console.log("✅ Категории созданы");

  const ingredientIds = await seedIngredients();
  console.log("✅ Ингредиенты созданы");

  const productIds = await seedProducts(categoryMap);
  console.log("✅ Продукты созданы");

  await seedProductVariants(productIds);
  console.log("✅ Варианты продуктов созданы");

  const pizzaResults = await seedPizzas(categoryMap, ingredientIds);
  console.log("✅ Пиццы созданы");

  const cartMap = await seedCarts(userIds);
  console.log("✅ Корзины созданы");

  await seedCartItems(cartMap, ingredientIds);
  console.log("✅ Элементы корзин созданы");

  await seedOrders(userIds);
  console.log("✅ Заказы созданы");

  await seedStories();
  console.log("✅ Истории созданы");

  console.log("🎉 База данных успешно заполнена!");
};

const clearDatabase = async (): Promise<void> => {
  console.log("🗑️  Очистка базы данных...");

  for (const table of TABLES_TO_CLEAR) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
  }

  console.log("✅ База данных очищена");
};

const main = async (): Promise<void> => {
  try {
    await clearDatabase();
    await seedDatabase();
  } catch (error) {
    console.error("❌ Ошибка при заполнении базы данных:", error);
    throw error;
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
