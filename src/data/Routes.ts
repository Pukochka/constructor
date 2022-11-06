import { MainRoutes } from "../types";
export const Routes: MainRoutes[] = [
  {
    text: "Все категории",
    route: "category/main?isNM=1",
    type_value: 0,
  },
  {
    text: "Определенная категория/подкатегория",
    route: "category/view?isNM=1",
    type_value: 2,
    text_value: "Выберите категорию",
    identifier: "&id=",
    options: [
      {
        id: 633,
        title: "Суши",
        description: "Текст",
      },
      {
        id: 254,
        title: "Пицца",
        description: "Текст",
      },
    ],
  },
  {
    text: "Определенный товар",
    route: "category/product?isNM=1",
    text_value: "Выберите товар",
    type_value: 2,
    identifier: "&id=",
    options: [
      // {
      //   id: 965,
      //   title: "Попугаи",
      //   description: "Текст",
      // },
      // {
      //   id: 845,
      //   title: "Тигры",
      //   description: "Текст",
      // },
    ],
  },
  {
    text: "Профиль",
    type: "category",
    type_value: 1,
    options: [
      {
        text: "Главная",
        route: "profile/index",
        type: "route",
        type_value: 0,
      },
      {
        text: "История заказов",
        route: "profile/historyOrder",
        type_value: 0,
        type: "route",
      },
    ],
  },
  {
    text: "Витрина",
    route: "category/all",
    type_value: 0,
  },
  {
    text: "Корзина",
    route: "cart/index?index=0",
    type_value: 0,
  },
  {
    text: "Реферальная система",
    route: "profile/refView?isNM=1",
    type_value: 0,
  },
  {
    text: "Приветствие",
    route: "system/start",
    type_value: 0,
  },
  {
    text: "О сервисе",
    route: "system/about",
    type_value: 0,
  },
  {
    text: "Активировать купон",
    route: "profile/activateCode?isNM=1",
    type_value: 0,
  },
  {
    text: "Свободное сообщение",
    route: "system/free",
    text_value: "Выберите сообщение",
    type_value: 2,
    identifier: "?id=",
    options: [
      {
        id: 22,
        title: "Кнопка",
        description: "Текст",
      },
      {
        id: 23,
        title: "Кнопка",
        description: "Текст",
      },
    ],
  },
  {
    text: "Администрирование(Доступ только менеджерам и создателю)",
    type: "category",
    type_value: 1,
    options: [
      {
        text: "Панель управления",
        route: "admin/index",
        type_value: 0,
        type: "route",
      },
      {
        text: "Панель управления рассылками",
        route: "mailing/index",
        type_value: 0,
        type: "route",
      },
      {
        text: "Панель управления пользователям",
        route: "users/index",
        type_value: 0,
        type: "route",
      },
    ],
  },
  {
    text: "Раздел пополнения",
    type: "category",
    type_value: 1,
    options: [
      {
        text: "Запрос суммы пополнения",
        route: "replenishment/index",
        type_value: 0,
        type: "route",
      },
      {
        text: "История пополнений",
        route: "replenishment/history",
        type_value: 0,
        type: "route",
      },
    ],
  },
];
