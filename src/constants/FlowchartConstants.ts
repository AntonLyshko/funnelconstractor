import { MenuShapeConfig, ShapeConfig, TMenuResponse } from '@interfaces/ShapeConfig.interface';
import { DimensionShapeType } from '@interfaces/Shape.interface';
import { ClassShapeType, ModelShapeType } from '@interfaces/Types';
import { Channel } from '@constants/ChannelConstants';

export

    /**
     * @deprecated
     * Размер сетки страницы */
    const PAGE_GRID_SIZE = 30;


export class PaperSettings {
    static GRID_SIZE = 30;
    static WIDTH = 10000;
    static HEIGHT = 3000;
    static SNAP_LINK_RADIUS = 40;
}

const LISTENER_SHAPE_MESSAGE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.LISTENER,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 7
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    icon: {
        name: 'gear'
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        preview: null,
        content: 'Входящее сообщение',
        textAlign: 'center',
        defaultPort: {
            positive: true,
            negative: false
        },
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },


    footer: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: null,
        preset: {
            channel: true
        }
    }
};
const LISTENER_SHAPE_INPUT: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.LISTENER,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 6
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: false,
        in: true,
        control: true
    },
    icon: {
        name: 'solid_cog'
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        preview: null,
        content: 'Ввод данных',
        textAlign: 'center',
        defaultPort: {
            positive: true,
            negative: true
        },
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },

    footer: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: null,
        preset: {
            channel: true
        }
    }
};
const LISTENER_SHAPE_FORM: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.LISTENER,
    menuTitle: '',
    name: '',
    menu_item_id: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 6
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: false,
        in: true,
        control: true
    },
    icon: {
        name: 'solid_cog'
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        preview: null,
        content: 'Заполнена форма',
        defaultPort: {
            positive: true,
            negative: false
        },
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },

    footer: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: null,
        preset: {
            channel: true
        }
    }
};

const ACTION_SHAPE_SEND_MESSAGE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.ACTION,
    menuTitle: '',
    name: '',
    menu_item_id: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 7
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    icon: {
        name: 'solid_cog'
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        preview: null,
        content: 'Отправить сообщение',
        defaultPort: {
            positive: false,
            negative: false
        },
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },

    footer: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: null,
        preset: {
            channel: true
        }
    }
};

const LISTENER_SHAPE_OPTION: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.LISTENER,
    menuTitle: '',
    name: '',
    menu_item_id: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 7
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    icon: {
        name: 'solid_cog'
    },
    header: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        content: 'Входящее сообщение',
    },
    body: {
        visible: false,
        size: {
            stretch: null,
            height: 2
        },
        preview: null,
        content: null,
        defaultPort: null,
        controlPort: null
    },
    options: {
        visible: true,
        items: [
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'баланс',
                port: {
                    positive: true,
                    negative: false,
                }
            },
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'часовщик',
                port: {
                    positive: true,
                    negative: false,
                }
            },
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'карта',
                port: {
                    positive: true,
                    negative: false,
                }
            },
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'информация',
                port: {
                    positive: true,
                    negative: false,
                }
            }
        ]
    },


    footer: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: null,
        preset: {
            channel: true
        }
    }
};

const MAX_SHAPE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    class: ClassShapeType.ACTION,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 8
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    icon: {
        name: 'brands_airbnb'
    },
    header: {
        visible: true,
        size: {
            stretch: null,
            height: 1.5
        },
        content: 'Предложение на несколько строк для реализации динамической высоты'
    },
    body: {
        visible: true,
        size: {
            stretch: {
                stretchable: true,
                maxHeight: 6
            },
            height: 2
        },
        textAlign: 'left',
        splitBySign: true,
        preview: null,
        content: 'Входящее сообщение. с несколькими строками кода. Входящее сообщение с несколькими строками кода',
        defaultPort: {
            positive: true,
            negative: true
        },
        controlPort: null
    },
    options: {
        visible: true,
        items: [
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'Опция TEST: Где. ограничена функция растягивания по высоте',
                port: {
                    positive: true,
                    negative: true,
                }
            },
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'Опция 2: Где очень много текста и макс высота на расстягивание максимальное',
                port: {
                    positive: false,
                    negative: true,
                }
            },
            {
                size: {
                    stretch: null,
                    height: 1.5
                },
                content: 'Опция 3: Где очень много текста и макс высота на расстягивание небольшая',
                port: {
                    positive: true,
                    negative: true,
                }
            },
        ]
    },

    footer: {
        visible: true,
        size: {
            stretch: {
                stretchable: true,
                maxHeight: 3
            },
            roundHeight: false,
            height: 1
        },
        content: 'Текст теперь доступен здесь',
        preset: {
            channel: true
        }
    }
};

const CONTROL_SHAPE_INFINITY: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    class: ClassShapeType.SYSTEM,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 3
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: false
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 4
        },
        content: null,
        preview: {
            icon: {
                width: 28,
                height: 28,
                faId: 'solid_plug'
            },
            text: {
                top: 'Лимит 15',
                bottom: null
            }
        },
        defaultPort: null,
        controlPort: {
            positive: 17,
            negative: 1
        }

    },
    options: {
        visible: false,
        items: null
    },
    footer: {
        visible: false,
        size: null,
        content: null,
        preset: null
    },
    icon: null
};
const CONTROL_SHAPE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    class: ClassShapeType.SYSTEM,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 3
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: false
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 4
        },
        content: null,
        preview: {
            icon: {
                width: 28,
                height: 28,
                faId: 'solid_plug'
            },
            text: {
                top: null,
                bottom: null
            }
        },
        defaultPort: null,
        controlPort: {
            positive: 3,
            negative: 1
        }

    },
    options: {
        visible: false,
        items: null
    },
    footer: {
        visible: false,
        size: null,
        content: null,
        preset: null
    },
    icon: null
};

const START_SHAPE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    class: ClassShapeType.SYSTEM,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 3
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: false,
        control: false
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        content: null,
        preview: {
            icon: {
                faId: 'solid_flag'
            },
            text: {
                top: null,
                bottom: null
            }
        },
        defaultPort: null,
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },
    footer: {
        visible: false,
        size: null,
        content: null,
        preset: null
    },
    icon: null
};

const END_SHAPE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    class: ClassShapeType.SYSTEM,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 3
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: false,
        in: true,
        control: false
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2
        },
        content: null,
        preview: {
            icon: {
                faId: 'solid_flag-checkered'
            },
            text: null,
        },
        defaultPort: null,
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },
    footer: {
        visible: false,
        size: null,
        content: null,
        preset: null
    },
    icon: null
};


const CONDITION_SHAPE: ShapeConfig = {
    type: ModelShapeType.RECTANGLE,
    menu_item_id: '',
    menuTitle: '',
    name: '',
    class: ClassShapeType.CONDITION,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 5
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: false,
        in: true,
        control: false
    },
    icon: {
        name: 'solid_cog'
    },
    header: {
        visible: false,
        size: null,
        content: null
    },
    body: {
        visible: true,
        size: {
            stretch: null,
            height: 2.5
        },
        preview: null,
        content: 'Условие',
        textAlign: 'center',
        defaultPort: {
            positive: true,
            negative: true
        },
        controlPort: null
    },
    options: {
        visible: false,
        items: null
    },

    footer: {
        visible: false,
        size: null,
        content: null,
        preset: null
    }
};

const CLOCK_SHAPE: any = {
    type: ModelShapeType.CIRCLE,
    class: ClassShapeType.SYSTEM,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 3
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    body: {
        visible: true,
        size: null,
        preview: {
            icon: {
                faId: 'solid_clock'
            },
            text: {
                top: '3 сен.',
                bottom: '23:59'
            }
        },
        content: null,
        defaultPort: {
            positive: true,
            negative: false
        },
        controlPort: null
    },
    icon: null
};

const CLOCK_SHAPE_BIG: any = {
    type: ModelShapeType.CIRCLE,
    class: ClassShapeType.SYSTEM,
    dimension: {
        type: DimensionShapeType.SQUARE,
        size: {
            width: 6
        }
    },
    channel: {
        [Channel.WHATSAPP]: true,
        [Channel.INSTAGRAM]: true,
        [Channel.VK]: true,
        [Channel.OK]: true,
        [Channel.VIBER]: true,
        [Channel.FACEBOOK]: true,
        [Channel.TELEGRAM]: true,
        [Channel.EMAIL]: true
    },
    ports: {
        out: true,
        in: true,
        control: true
    },
    body: {
        visible: true,
        size: null,
        preview: {
            icon: {
                faId: 'solid_clock'
            },
            text: {
                top: '3 сен.',
                bottom: '23:59'
            }
        },
        content: null,
        defaultPort: {
            positive: true,
            negative: false
        },
        controlPort: null
    },
    icon: null
};

export const FIX_RESPONSE: TMenuResponse = [
    {
        text: 'Условие',
        icon: 'solid_book-open',
        items: [
            {
                type: 'menu.item',
                text: 'Отправить сообщение',
                name: '',
                icon: 'solid_cog',
                shape: CONDITION_SHAPE
            }
        ]
    },
    {
        text: 'Действие',
        icon: 'brands_microsoft',
        items: [
            {
                type: 'menu.item',
                text: 'Отправить сообщение',
                name: '',
                icon: 'solid_cog',
                shape: ACTION_SHAPE_SEND_MESSAGE
            }
        ]
    },
    {
        text: 'Слушатель',
        icon: 'solid_envelope-open',
        items: [
            {
                type: 'menu.item',
                text: 'Заполнена форма',
                name: '',
                icon: 'solid_cog',
                shape: LISTENER_SHAPE_FORM
            },
            {
                type: 'menu.item',
                text: 'Входящее сообщение 2',
                name: '',
                icon: 'solid_cog',
                shape: LISTENER_SHAPE_OPTION
            },
            {
                type: 'menu.item',
                text: 'Входящее сообщение',
                name: '',
                icon: 'solid_cog',
                shape: LISTENER_SHAPE_MESSAGE
            },
            {
                type: 'menu.item',
                text: 'Ввод данных',
                name: '',
                icon: 'solid_cog',
                shape: LISTENER_SHAPE_INPUT
            },
        ]
    },
    {
        text: 'Конструктор',
        icon: 'solid_play',
        items: [
            {
                type: 'menu.item',
                text: 'Фигура МАКС.',
                name: '',
                icon: 'solid_cog',
                shape: MAX_SHAPE
            }
        ]
    },
    {
        text: 'Системные',
        icon: 'solid_play',
        items: [
            {
                type: 'menu.item',
                text: 'Блок управления',
                name: '',
                icon: 'solid_cog',
                shape: CONTROL_SHAPE
            },
            {
                type: 'menu.item',
                text: 'Блок управления МАКС',
                name: '',
                icon: 'solid_cog',
                shape: CONTROL_SHAPE_INFINITY
            },
            {
                type: 'menu.item',
                text: 'Блок Старт',
                icon: 'solid_flag',
                name: '',
                shape: START_SHAPE
            },
            {
                type: 'menu.item',
                text: 'Блок Конец',
                icon: 'solid_flag-checkered',
                name: '',
                shape: END_SHAPE
            },
            {
                type: 'menu.item',
                text: 'Блок Таймер',
                name: '',
                icon: 'solid_clock',
                shape: CLOCK_SHAPE
            },
            {
                type: 'menu.item',
                text: 'Блок Таймер BIG',
                name: '',
                icon: 'solid_clock',
                shape: CLOCK_SHAPE_BIG
            }
        ]
    },
];

export const TEST_RESPONSE: MenuShapeConfig[] = [
    // {
    //     text: 'Отправить сообщение',
    //     category: 'Условие',
    //     icon: 'gear',
    //     shape: CONDITION_SHAPE
    // },
    // {
    //     text: 'Отправить сообщение',
    //     category: 'Действие',
    //     icon: 'gear',
    //     shape: ACTION_SHAPE_SEND_MESSAGE
    // },
    // {
    //     text: 'Заполнена форма',
    //     category: 'Слушатель',
    //     icon: 'gear',
    //     shape: LISTENER_SHAPE_FORM
    // },
    // {
    //     text: 'Входящее сообщение 2',
    //     category: 'Слушатель',
    //     icon: 'gear',
    //     shape: LISTENER_SHAPE_OPTION
    // },
    // {
    //     text: 'Входящее сообщение',
    //     category: 'Слушатель',
    //     icon: 'gear',
    //     shape: LISTENER_SHAPE_MESSAGE
    // },
    // {
    //     text: 'Ввод данных',
    //     category: 'Слушатель',
    //     icon: 'gear',
    //     shape: LISTENER_SHAPE_INPUT
    // },
    // {
    //     text: 'Фигура МАКС.',
    //     category: 'Конструктор',
    //     icon: 'gear',
    //     shape: MAX_SHAPE
    // },
    // {
    //     text: 'Блок управления',
    //     category: 'Системные',
    //     icon: 'gear',
    //     shape: CONTROL_SHAPE
    // },
    // {
    //     text: 'Блок управления МАКС',
    //     category: 'Системные',
    //     icon: 'gear',
    //     shape: CONTROL_SHAPE_INFINITY
    // },
    // {
    //     text: 'Блок Старт',
    //     category: 'Системные',
    //     icon: 'solid_flag',
    //     shape: START_SHAPE
    // },
    // {
    //     text: 'Блок Конец',
    //     category: 'Системные',
    //     icon: 'solid_flag-checkered',
    //     shape: END_SHAPE
    // },
    // {
    //     text: 'Блок Таймер',
    //     category: 'Системные',
    //     icon: 'solid_clock',
    //     shape: CLOCK_SHAPE
    // },
    // {
    //     text: 'Блок Таймер BIG',
    //     category: 'Системные',
    //     icon: 'solid_clock',
    //     shape: CLOCK_SHAPE_BIG
    // }
];


export const RESPONSE = [
    ...FIX_RESPONSE
]