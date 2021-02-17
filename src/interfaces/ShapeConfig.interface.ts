import { Channel } from '@constants/ChannelConstants';
import { ClassShapeType, ModelShapeType, PartType } from '@interfaces/Types';
import { DimensionShapeType } from '@interfaces/Shape.interface';

export interface PortListShapeConfig {
    items?: any;
    /** Добавляет порт управления */
    control?: boolean | void;

    /** Добавляет порт выхода */
    out?: boolean | void;

    /** Добавляет порт входа */
    in?: boolean | void;
}

export interface HeaderShapeConfig {
    visible?: boolean;
    size?: PartSizeConfig;
    textAlign?: string;
    splitBySign?: boolean;
    content?: string;
}

export interface StretchConfig {
    stretchable?: boolean;
    maxHeight?: number;
}

export interface PartSizeConfig {
    height?: number;
    roundHeight?: boolean;
    stretch?: StretchConfig | void;
}

export interface ChannelConfig {
    [Channel.WHATSAPP]: boolean | void;
    [Channel.EMAIL]: boolean | void;
    [Channel.FACEBOOK]: boolean | void;
    [Channel.INSTAGRAM]: boolean | void;
    [Channel.TELEGRAM]: boolean | void;
    [Channel.VK]: boolean | void;
    [Channel.VIBER]: boolean | void;
    [Channel.OK]: boolean | void;
}

export interface FooterShapeConfig {
    /** Если visible false то другие параметры не должны учитываться */
    visible: boolean;
    size: PartSizeConfig;
    textAlign?: string;
    splitBySign?: boolean;
    content: string;
    /**
     * Набор готовых иконок
     */
    preset: {
        channel: boolean
    }
}

export interface IconShapeConfig {
    name: string
}

export interface ShapeDimensionConfig {
    type: DimensionShapeType,
    size: {
        width: number
    }
}

export interface BodyShapeConfig {
    visible: boolean;
    size: PartSizeConfig;
    content: string;
    splitBySign?: boolean;
    textAlign?: string;
    preview: {
        icon: {
            width?: number | void;
            height?: number | void;
            faId: string;
        }
        text: {
            top: string | void;
            bottom: string | void;
        } | void
    }
    defaultPort: {
        positive: boolean;
        negative: boolean;
    }
    controlPort: {
        positive: number;
        negative: number
    }

}

export type ModelShapeConfig = typeof ModelShapeType[keyof typeof ModelShapeType];
export type ClassShapeConfig = typeof ClassShapeType[keyof typeof ClassShapeType];

export interface OptionItemShapeConfig {
    size: PartSizeConfig;
    textAlign?: string;
    splitBySign?: boolean;
    content: string;
    port: {
        positive: boolean;
        negative: boolean;
    }
}

export interface OptionListShapeConfig {
    visible: boolean;
    items: OptionItemShapeConfig[]
}

export interface ShapeConfig {
    /**
     * Тип используемой фигуры.
     * По нему определяем модель и прорисовку фигуры на странице.
     * @example
     * // Фигура в виде прямоугольника
     * type:'rectangle'
     * @example
     * // Фигура в виде круга
     * type:'circle'
     */
    type: ModelShapeConfig;
    menu_item_id: string;
    menuTitle: string,
    name: string;
    /** Подкласс фигуры: слушатель, условие, действие  */
    class: ClassShapeConfig;

    /** Размерность фигуры */
    dimension: ShapeDimensionConfig

    /**
     * Объект настроек портов всей фигуры.
     */
    ports: PortListShapeConfig;

    /** Каналы с которыми работает фигура */
    channel: ChannelConfig;

    /**
     * Иконка в верхней части фигуры
     */
    icon: IconShapeConfig;


    /**
     * Шапка фигуры.
     */
    [PartType.HEADER]: HeaderShapeConfig;
    [PartType.BODY]: BodyShapeConfig;
    [PartType.OPTIONS]: OptionListShapeConfig;
    [PartType.FOOTER]: FooterShapeConfig;

    initialize?: (assemblyData: any[any]) => void;
}


export interface MenuShapeConfig {
    name: any;
    type: string;
    icon: string;
    text: string;
    shape: ShapeConfig;
}

export type TMenuCategory = {
    icon: string;
    text: string;
    items: MenuShapeConfig[]
}

export type TMenuResponse = TMenuCategory[];