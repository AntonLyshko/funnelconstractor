import { ClassShapeType } from '@interfaces/Types';

const Colors = {
    GREY: '#666',
    GREY_1: '#71818E',
    DARK_GREY: '#495C6E',
    HARVARD_GREY: '#607D8B',
    BLUE: '#3498DB',
    BLUE_2: '#5DADE2',
    BLUE_3: '#2D3E50',
    GREEN: '#27AE60',
    RED: '#E74C3C',
    ORANGE: '#F39C12',
    WHITE: '#fff',
    TRANSPARENT_WHITE: 'rgba(255,255,255,0.7)',
    TRANSPARENT_DARK: 'rgba(121,121,121,0.7)',
    TRANSPARENT_BLUE: 'rgba(227,242,253,0.75)',
    TRANSPARENT_BLUE_1: 'rgba(207,216,220,0.75)',
    TRANSPARENT_GRAY: 'rgba(70,90,100,0.7)',
} as const;

const shapeStyle = {
    BACKGROUND: Colors.TRANSPARENT_WHITE,
    BACKGROUND_DARK: Colors.TRANSPARENT_DARK,
    ACTIVE_BACKGROUND: Colors.TRANSPARENT_BLUE,
    /** Фон шапки */
    HEADER_BACKGROUND: Colors.TRANSPARENT_GRAY,
    HEADER_TEXT_COLOR: Colors.WHITE,
    /** Цвет иконки */
    ICON_TYPE_COLOR: Colors.WHITE,
    /** Фон круга под иконкой */
    ICON_TYPE_BACKGROUND: {
        [ClassShapeType.CONDITION]: Colors.BLUE,
        [ClassShapeType.ACTION]: Colors.GREEN,
        [ClassShapeType.LISTENER]: Colors.ORANGE,
        [ClassShapeType.SYSTEM]: Colors.RED,
    },
    /** Межстрочный интервал всего текста */
    TEXT_LINE_HEIGHT: 20,
    TEXT_FONT_FAMILY: '"PT Sans", sans-serif',
    TEXT_FONT_SIZE: 16,
    /** Цвет текста */
    TEXT_COLOR: Colors.DARK_GREY,
    /** Фон футера */
    FOOTER_BACKGROUND: Colors.TRANSPARENT_BLUE_1,
    FOOTER_TEXT_COLOR: Colors.TRANSPARENT_BLUE_1,
    /** Цвет иконки в выключенном состоянии */
    SERVICE_DISABLED_COLOR: '#CCC',
    /** Цвет иконки в включенном состоянии */
    SERVICE_ENABLED_COLOR: '#333',
    /** Тень для ховер эффекта */
    SHADOW: {
        name: 'dropShadow',
        args: {
            color: '#000',
            dx: 0,
            dy: 10,
            opacity: 0.2,
            blur: 26
        }
    },
    OPTION_BORDER_COLOR: Colors.TRANSPARENT_BLUE_1,
    PREVIEW_ICON_COLOR: Colors.GREY_1
} as const;

const portsStyle = {
    /** Размер порта */
    PORT_RADIUS: 12,
    /** Ширина иконки */
    ICON_WIDTH: 10,
    /** Высота иконки */
    ICON_HEIGHT: 10,
    /** Цвет иконки */
    ICON_COLOR: Colors.WHITE,
    /** Заливка фона */
    IN_BACKGROUND: Colors.BLUE,
    /** Цвет обводки фона */
    IN_STROKE: Colors.BLUE,
    /** Заливка фона */
    OUT_BACKGROUND: Colors.BLUE,
    /** Цвет обводки фона */
    OUT_STROKE: Colors.BLUE,
    /** Заливка фона */
    POSITIVE_BACKGROUND: Colors.GREEN,
    /** Цвет обводки фона */
    POSITIVE_STROKE: Colors.GREEN,
    /** Заливка фона */
    NEGATIVE_BACKGROUND: Colors.RED,
    /** Цвет обводки фона */
    NEGATIVE_STROKE: Colors.RED,
    /** Заливка фона */
    CONTROL_BACKGROUND: Colors.GREY,
    /** Цвет обводки фона */
    CONTROL_STROKE: Colors.GREY
} as const;

const linkStyle = {
    COLOR: Colors.BLUE,
} as const;

const menuStyle = {
    HOVER_COLOR: Colors.BLUE_2,
    HOVER_BACKGROUND: Colors.BLUE_3
} as const;

export {
    shapeStyle,
    portsStyle,
    linkStyle,
    menuStyle
}