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
      type_value: 0,
      route: 'category/main?isNewMessage=true',
    },
    {
      text: '\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u0430\u044f \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f/\u043f\u043e\u0434\u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
      route: 'category/view',
      type_value: 2,
      text_value:
        '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
      identifier: '&id=',
      options: [],
      value: [[]],
    },
    {
      text: '\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0439 \u0442\u043e\u0432\u0430\u0440',
      route: 'category/count',
      text_value:
        '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u043e\u0432\u0430\u0440',
      type_value: 2,
      identifier: '&id=',
      options: [],
      value: [[]],
    },
    {
      text: '\u041d\u0430\u043b\u0438\u0447\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430',
      route: 'category/all',
      type_value: 0,
    },
    {
      text: '\u0412\u0432\u0435\u0441\u0442\u0438 \u043f\u0440\u043e\u043c\u043e\u043a\u043e\u0434',
      route: 'profile/activateCode',
      type_value: 0,
    },
    {
      text: '\u041e \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0435',
      route: 'shop/info',
      type_value: 0,
    },
    {
      text: '\u041f\u043e\u043c\u043e\u0449\u044c',
      route: 'shop/help',
      type_value: 0,
    },
    {
      text: '\u041f\u0440\u0430\u0432\u0438\u043b\u0430',
      route: 'shop/rules',
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
          id: 7,
          title:
            '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0441 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u043e\u0439',
          description: '\u0422\u0435\u043a\u0441\u0442',
        },
        {
          id: 10,
          title:
            '\u0422\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
          description: '\u0422\u0435\u043a\u0441\u0442',
        },
        {
          id: 11,
          title:
            '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0441 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u043e\u0439',
          description: '\u0422\u0435\u043a\u0441\u0442',
        },
      ],
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
  WEBS: [],
};
// export default {
//   HOST: host,
//   BOT: bot,
//   MENU: menu_support,
//   MENU_MAIN: menu_main,
//   ROUTES: routes,
//   WEBS: webs,
// };
