type LayoutLinks = {
  title: string;
  icon: string;
  link: string;
};


export default <LayoutLinks[]>[
  {
    title: 'Рабочий стол',
    icon: 'computer',
    link: '/lk/desktop/index',
  },
  {
    title: 'Профиль',
    icon: 'person',
    link: '/user/profile/index',
  },
  {
    title: 'Мои боты',
    icon: 'precision_manufacturing',
    link: '/lk/bot/telegram/index',
  },
  {
    title: 'Партнёрам',
    icon: 'handshake',
    link: '/user/referal/index',
  },
  {
    title: 'Персональная разработка',
    icon: 'developer_mode',
    link: '/lk/desktop/development',
  },
];
