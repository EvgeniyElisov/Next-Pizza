export const randomDecimalNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductVariant = ({
  productId,
  pizzaType,
  size,
  price,
}: {
  productId: number;
  pizzaType?: number;
  size?: number;
  price?: number;
}) => {
  // Если цена указана явно, используем её
  if (price !== undefined) {
    return {
      productId,
      price,
      pizzaType,
      size,
    };
  }

  // Для пицц генерируем цену в зависимости от размера
  if (pizzaType !== undefined && size !== undefined) {
    let basePrice: number;
    if (size === 20) {
      basePrice = Math.floor(randomDecimalNumber(15, 20));
    } else if (size === 30) {
      basePrice = Math.floor(randomDecimalNumber(22, 28));
    } else if (size === 40) {
      basePrice = Math.floor(randomDecimalNumber(30, 38));
    } else {
      basePrice = Math.floor(randomDecimalNumber(15, 38));
    }
    return {
      productId,
      price: basePrice,
      pizzaType,
      size,
    };
  }

  // Для обычных продуктов (завтраки, закуски) генерируем случайную цену
  return {
    productId,
    price: Math.floor(randomDecimalNumber(10, 50)),
    pizzaType,
    size,
  };
};

