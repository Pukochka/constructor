export default {
  HOST: 'https://api.bot-t.com',
  BOT: {
    token: '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI',
    id: 12845,
  },
  MENU: [],
  MENU_MAIN: [],
  ROUTES: [
    {
      text: '\u0412\u0441\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438',
      route: 'category/main',
      type_value: 0,
    },
    {
      text: '\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u0430\u044f \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f/\u043f\u043e\u0434\u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
      route: 'category/view',
      type_value: 2,
      text_value:
        '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
      identifier: '?id=',
      options: [
        {
          id: 602400,
          title: '\u041a\u043e\u043c\u0431\u043e',
          description: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
        },
      ],
      value: [
        {
          602400: '\u041a\u043e\u043c\u0431\u043e',
        },
      ],
    },
    {
      text: '\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0439 \u0442\u043e\u0432\u0430\u0440',
      route: 'category/product',
      text_value:
        '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u043e\u0432\u0430\u0440',
      type_value: 2,
      identifier: '?id=',
      options: [
        {
          id: 602402,
          title:
            '\u0412\u043e\u043f\u043f\u0435\u0440 \u041a\u0438\u043d\u0433 \u041a\u043e\u043c\u0431\u043e',
          description: '\u041a\u043e\u043c\u0431\u043e',
        },
      ],
      value: [
        {
          602402:
            '\u0412\u043e\u043f\u043f\u0435\u0440 \u041a\u0438\u043d\u0433 \u041a\u043e\u043c\u0431\u043e',
        },
      ],
    },
    {
      text: '\u0412\u0438\u0442\u0440\u0438\u043d\u0430',
      route: 'category/all',
      type_value: 0,
    },
    {
      text: '\u041a\u043e\u0440\u0437\u0438\u043d\u0430',
      route: 'cart/index?index=0',
      type_value: 0,
    },
    {
      text: '\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u0443\u043f\u043e\u043d',
      route: 'profile/activateCode',
      type_value: 0,
    },
    {
      text: '\u041f\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435',
      route: 'system/start',
      type_value: 0,
    },
    {
      text: '\u041e \u0441\u0435\u0440\u0432\u0438\u0441\u0435',
      route: 'system/about',
      type_value: 0,
    },
    {
      text: '\u041f\u0440\u043e\u0444\u0438\u043b\u044c',
      type: 'category',
      type_value: 1,
      options: [
        {
          text: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
          route: 'profile/index',
          type: 'route',
          type_value: 0,
        },
        {
          text: '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432',
          route: 'profile/historyOrder',
          type_value: 0,
          type: 'route',
        },
      ],
    },
    {
      text: '\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
      route: 'system/free',
      text_value:
        '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
      type_value: 2,
      identifier: '?id=',
      options: [
        {
          id: 14214,
          title:
            '\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435',
          description:
            '\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435',
          type_value: 0,
        },
      ],
      value: {
        14214:
          '\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435',
      },
    },
    {
      text: '\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435(\u0414\u043e\u0441\u0442\u0443\u043f \u0442\u043e\u043b\u044c\u043a\u043e \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u0430\u043c \u0438 \u0441\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044e)',
      type: 'category',
      type_value: 1,
      options: [
        {
          text: '\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f',
          route: 'admin/index',
          type_value: 0,
          type: 'route',
        },
        {
          text: '\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0430\u043c\u0438',
          route: 'mailing/index',
          type_value: 0,
          type: 'route',
        },
        {
          text: '\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c',
          route: 'users/index',
          type_value: 0,
          type: 'route',
        },
      ],
    },
    {
      text: '\u0420\u0430\u0437\u0434\u0435\u043b \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f',
      type: 'category',
      type_value: 1,
      options: [
        {
          text: '\u0417\u0430\u043f\u0440\u043e\u0441 \u0441\u0443\u043c\u043c\u044b \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f',
          route: 'replenishment/index',
          type_value: 0,
          type: 'route',
        },
        {
          text: '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0439',
          route: 'replenishment/history',
          type_value: 0,
          type: 'route',
        },
      ],
    },
  ],

  WEBS: [
    {
      id: 1,
      text: 'SHOP WEB',
      value:
        'https://shopdigital.bot-t.com/?bot_id=12845&secretKey=db0b766fdbc2274841d28673d0f4cf15dc311b9827f7c7cb2539d05a0f1c317e',
      type: 'single',
    },
    {
      id: 193,
      text: 'SHOP WEB',
      value:
        'https://shopdigital.bot-t.com/?bot_id=12845&secretKey=db0b766fdbc2274841d28673d0f4cf15dc311b9827f7c7cb2539d05a0f1c317e',
      type: 'single',
    },
  ],
};
// export default {
//   HOST: host,
//   BOT: bot,
//   MENU: menu_support,
//   MENU_MAIN: menu_main,
//   ROUTES: routes,
//   WEBS: webs,
// };
