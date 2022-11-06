import { Command } from '../types';

export const Commands: Command[] = [
  {
    label: '/start',
    id: 0,
    columns: [
      {
        id: 0,
        command_id: 0,
        blocks: [
          {
            id: 0,
            column_id: 0,
            type: 0,
            connection_count: 0,
            block_options: {
              name: 'Приветствие в боте',
              color: '#26A69A'
            },
            options: 'Начальная команда',
            buttons: [
              {
                type: 0,
                label: 'Согласен',
                id: 0,
                connection: {
                  to: null,
                  type: 5,
                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: {
                    command_id: 0,
                    column_id: 4324,
                    block_id: 13431,
                  }
                }
              },
              {
                type: 0,
                label: 'Не согласен',
                id: 1,
                connection: {
                  to: null,
                  type: 5,
                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: null
                }
              },
            ]
          }
        ],
      },
      {
        id: 4324,
        command_id: 0,
        blocks: [
          {
            id: 13431,
            column_id: 4324,
            type: 0,
            block_options: {
              name: 'Выбор 1',
              color: '#26A69A'
            },
            connection_count: 0,
            options: 'Выберите категорию',
            buttons: [
              {
                type: 0,
                label: 'Телефоны',
                id: 4234432,
                connection: {
                  to: null,
                  type: 5,
                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: null
                }
              },
              {
                type: 0,
                label: 'Ноутбуки',
                id: 2342234,
                connection: {
                  to: null,
                  type: 5,
                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: null
                }
              },
            ]
          }
        ],
      }
    ]
  },
  // {
  //   label: '/options',
  //   id: 1,
  //   columns: [
  //     {
  //       id: 0,
  //       command_id: 1,
  //       blocks: [
  //         {
  //           id: 0,
  //           column_id: 0,
  //           type: 0,
  //           block_options: {
  //             name: 'Приветствие в боте',
  //             color: '#fff000'
  //           },
  //           options: 'Выберите ноутбук',
  //           buttons: [
  //             {
  //               type: 0,
  //               label: 'Согласен',
  //               id: 2,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //             {
  //               type: 0,
  //               label: 'Не согласен',
  //               id: 3,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //           ]
  //         },
  //         {
  //           id: 1,
  //           column_id: 0,
  //           type: 0,
  //           block_options: {
  //             name: 'Приветствие в боте',
  //             color: '#fff000'
  //           },
  //           options: 'Прив423423етствие в боте',
  //           buttons: [
  //             {
  //               type: 0,
  //               label: 'Соглаfsdсен',
  //               id: 4,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //             {
  //               type: 0,
  //               label: 'Не со423гласен',
  //               id: 5,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //           ]
  //         }
  //       ],
  //     },
  //     {
  //       id: 1,
  //       command_id: 1,
  //       blocks: [
  //         {
  //           id: 0,
  //           column_id: 1,
  //           type: 0,
  //           block_options: {
  //             name: 'Приветствие в боте',
  //             color: '#fff000'
  //           },
  //           options: 'Приветствие в боте',
  //           buttons: [
  //             {
  //               type: 0,
  //               label: 'Согласен',
  //               id: 6,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null,
  //                 coords: {
  //                   start_x: 0,
  //                   start_y: 0,
  //                   path: '',
  //                   polygon: ''
  //                 },
  //                 toRoute: null
  //               }
  //             },
  //             {
  //               type: 0,
  //               label: 'Не согласен',
  //               id: 7,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null,
  //                 coords: {
  //                   start_x: 0,
  //                   start_y: 0,
  //                   path: '',
  //                   polygon: ''
  //                 },
  //                 toRoute: null
  //               }
  //             },
  //           ]
  //         },
  //         {
  //           id: 1,
  //           column_id: 1,
  //           type: 0,
  //           block_options: {
  //             name: 'Приветствие в боте',
  //             color: '#fff000'
  //           },
  //           options: 'Приветствие в боте',
  //           buttons: [
  //             {
  //               type: 0,
  //               label: 'Согласен',
  //               id: 8,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //             {
  //               type: 0,
  //               label: 'Не согласен',
  //               id: 9,
  //               connection: {
  //                 to: null,
  //                 type: 0,
  //                 info: null
  //               }
  //             },
  //           ]
  //         }
  //       ],
  //     }
  //   ]
  // },
  {
    label: '/data',
    id: 2,
    columns: [
      {
        id: 0,
        command_id: 2,
        blocks: [
          {
            id: 0,
            column_id: 0,
            type: 0,
            block_options: {
              name: 'Приветствие в боте',
              color: '#fff000'
            },
            options: 'Приветствие в боте',
            connection_count: 0,
            buttons: [
              {
                type: 0,
                label: 'Согласен',
                id: 10,
                connection: {
                  to: null,
                  type: 0,
                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: null
                }
              },
              {
                type: 0,
                label: 'Не согласен',
                id: 11,
                connection: {
                  to: null,
                  type: 0,

                  info: null,
                  coords: {
                    start_x: 0,
                    start_y: 0,
                    path: '',
                    polygon: ''
                  },
                  toRoute: null
                }
              },
            ]
          }
        ],
      }
    ]
  },
];
