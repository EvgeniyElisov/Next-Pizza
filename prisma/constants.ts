export const USERS_DATA = [
  {
    fullName: "Иван Иванов",
    email: "user@test.ru",
    password: "111111",
    role: "USER" as const,
  },
  {
    fullName: "Админ Админов",
    email: "admin@test.ru",
    password: "111111",
    role: "ADMIN" as const,
  },
  {
    fullName: "Петр Петров",
    email: "petr@test.ru",
    password: "111111",
    role: "USER" as const,
  },
];

export const CATEGORIES_DATA = [
  { name: "Пиццы" },
  { name: "Завтраки" },
  { name: "Закуски" },
  { name: "Коктейли" },
  { name: "Напитки" },
];

export const INGREDIENTS_DATA = [
  {
    name: "Сырный бортик",
    price: 5,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Острый перец халапеньо",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Нежный цыпленок",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Шампиньоны",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Ветчина",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Пикантная пепперони",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Острая чоризо",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Маринованные огурчики",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Свежие томаты",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Красный лук",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Сочные ананасы",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Итальянские травы",
    price: 15,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Сладкий перец",
    price: 25,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Кубики брынзы",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Митболы",
    price: 20,
    imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
];

export const PRODUCTS_DATA = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
    categoryName: "Завтраки",
    price: 12,
  },
  {
    name: "Омлет с пепперони",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
    categoryName: "Завтраки",
    price: 13,
  },
  {
    name: "Кофе Латте",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryName: "Завтраки",
    price: 8,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
    categoryName: "Закуски",
    price: 7,
  },
  {
    name: "Куриные наггетсы",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
    categoryName: "Закуски",
    price: 10,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
    categoryName: "Закуски",
    price: 8,
  },
  {
    name: "Додстер",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
    categoryName: "Закуски",
    price: 6,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
    categoryName: "Закуски",
    price: 7,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
    categoryName: "Коктейли",
    price: 8,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
    categoryName: "Коктейли",
    price: 9,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
    categoryName: "Коктейли",
    price: 10,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
    categoryName: "Коктейли",
    price: 7,
  },
  {
    name: "Ирландский Капучино",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
    categoryName: "Напитки",
    price: 8,
  },
  {
    name: "Карамельный капучино",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
    categoryName: "Напитки",
    price: 7,
  },
  {
    name: "Кокосовый латте",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
    categoryName: "Напитки",
    price: 9,
  },
  {
    name: "Американо",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
    categoryName: "Напитки",
    price: 5,
  },
  {
    name: "Латте",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryName: "Напитки",
    price: 6,
  },
];

export const PIZZAS_DATA = [
  {
    name: "Пепперони фреш",
    imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
    categoryName: "Пиццы",
    ingredientIndices: [0, 5],
    variants: [
      { pizzaType: 1, size: 20 },
      { pizzaType: 2, size: 30 },
      { pizzaType: 2, size: 40 },
    ],
  },
  {
    name: "Сырная",
    imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
    categoryName: "Пиццы",
    ingredientIndices: [5, 10],
    variants: [
      { pizzaType: 1, size: 20 },
      { pizzaType: 1, size: 30 },
      { pizzaType: 1, size: 40 },
      { pizzaType: 2, size: 20 },
      { pizzaType: 2, size: 30 },
      { pizzaType: 2, size: 40 },
    ],
  },
  {
    name: "Чоризо фреш",
    imageUrl: "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
    categoryName: "Пиццы",
    ingredientIndices: [10, 17],
    variants: [
      { pizzaType: 1, size: 20 },
      { pizzaType: 2, size: 30 },
      { pizzaType: 2, size: 40 },
    ],
  },
  {
    name: "Маргарита",
    imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
    categoryName: "Пиццы",
    ingredientIndices: [0, 3],
    variants: [
      { pizzaType: 1, size: 20 },
      { pizzaType: 1, size: 30 },
      { pizzaType: 2, size: 40 },
    ],
  },
  {
    name: "Гавайская",
    imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
    categoryName: "Пиццы",
    ingredientIndices: [3, 8],
    variants: [
      { pizzaType: 1, size: 20 },
      { pizzaType: 2, size: 30 },
      { pizzaType: 2, size: 40 },
    ],
  },
];

export const STORIES_DATA = [
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
    items: [
      "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
    ],
  },
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
    items: [
      "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
    ],
  },
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
    items: [
      "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
    ],
  },
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
    items: [
      "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
    ],
  },
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
    items: [
      "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
    ],
  },
  {
    previewImageUrl: "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
    items: [
      "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
    ],
  },
];

export const TABLES_TO_CLEAR = [
  "StoryItem",
  "Story",
  "CartItem",
  "Cart",
  "Order",
  "VerificationCode",
  "ProductVariant",
  "Product",
  "Ingredient",
  "Category",
  "User",
];

