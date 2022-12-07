type LayoutLinks = {
  title: string;
  icon: string;
  link: string;
};

import CONFIG from '../../../botconfig';

export default <LayoutLinks[]>[
  {
    title: 'Рабочий стол бота',
    icon: 'credit_card',
    link: `/lk/bot/telegram/redirect?bot_id=${CONFIG.BOT.id}`,
  },
  {
    title: 'Премиум настройки',
    icon: 'workspace_premium',
    link: `/lk/common/main/redirect?bot_id=${CONFIG.BOT.id}`,
  },
  {
    title: 'Сгенерировать команды',
    icon: 'add_circle',
    link: `/lk/common/premium/route/generate-commands?bot_id=${CONFIG.BOT.id}`,
  },
  // {
  //   title: 'Сбросить все маршруты',
  //   icon: 'restart_alt',
  //   link: `/lk/common/premium/route/reset?bot_id=${CONFIG.BOT.id}`,
  // },
];
