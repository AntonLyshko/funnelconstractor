import { BackgroundPortAttrs, PortAttrs } from '@interfaces/Shape.interface';
import { portsStyle } from './StyleConstants';

export namespace Position {
    export const Top = {
        name: 'top'
    }
    export const Bottom = {
        name: 'bottom'
    }
    export const Left = {
        name: 'left'
    }
    export const Right = {
        name: 'right'
    }
}


export enum Type {
    In = 'in',
    Out = 'out',
    Positive = 'positive',
    Negative = 'negative',
    Control = 'control',
    PositiveControl = 'positive-control',
    NegativeFooter = 'negative-footer',
    NegativeControl = 'negative-control',
}

export namespace Icon {
    export const In = '#solid_chevron-down';
    export const Out = '#solid_chevron-down';
    export const Positive = '#solid_plus';
    export const Negative = '#solid_minus';
    export const Control = '#solid_plug';
    export const ControlPositive = '#solid_plug';
    export const ControlNegative = '#solid_plug';
}

export namespace Selector {
    export const Body = '.port-body';
    export const Background = '.port-background';
    export const Icon = '.port-icon';
    export const removeDot = (selector: string) => selector.replace('.', '');
}

export namespace DefaultAttr {
    export const getBody = <T extends object>(attrs?: T) => {
        return {
            magnet: 'active',
            cursor: 'pointer',
            ...attrs,
        }
    }
    export const getBackground = <T extends BackgroundPortAttrs>(attrs: T) => {
        return {
            r: portsStyle.PORT_RADIUS,
            ...attrs,
        }
    }

    export const getIcon = <T extends PortAttrs>(attrs: T) => {
        return {
            fill: portsStyle.ICON_COLOR,
            width: portsStyle.ICON_WIDTH,
            height: portsStyle.ICON_HEIGHT,
            yAlignment: 'middle',
            xAlignment: 'middle',
            refX: .5,
            refY: .5,
            ...attrs,
        }
    }
}

export namespace Markup {
    export const OutGroup = {
        position: Position.Bottom,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.OUT_BACKGROUND,
                stroke: portsStyle.OUT_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.Out
            })
        }
    }

    export const InGroup = {
        position: Position.Top,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody({
                magnet: 'passive'
            }),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.IN_BACKGROUND,
                stroke: portsStyle.IN_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.In
            })
        }
    }

    export const ControlGroup = {
        position: Position.Bottom,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody({
                magnet: 'passive'
            }),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.CONTROL_BACKGROUND,
                stroke: portsStyle.CONTROL_BACKGROUND,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.Control,
                width: portsStyle.ICON_WIDTH + 6,
                height: portsStyle.ICON_HEIGHT + 6,
            })
        }
    }

    export const PositiveGroup = {
        position: Position.Right,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.POSITIVE_BACKGROUND,
                stroke: portsStyle.POSITIVE_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.Positive
            })
        }
    }

    export const NegativeGroup = {
        position: Position.Left,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.NEGATIVE_BACKGROUND,
                stroke: portsStyle.NEGATIVE_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.Negative
            })
        }
    }

    export const NegativeFooterGroup = {
        position: Position.Bottom,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.NEGATIVE_BACKGROUND,
                stroke: portsStyle.NEGATIVE_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.Negative
            })
        }
    }

    export const ControlNegativeGroup = {
        position: Position.Left,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.NEGATIVE_BACKGROUND,
                stroke: portsStyle.NEGATIVE_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.ControlNegative,
                width: portsStyle.ICON_WIDTH + 6,
                height: portsStyle.ICON_HEIGHT + 6,
            })
        }
    }

    export const ControlPositiveGroup = {
        position: Position.Right,
        attrs: {
            [Selector.Body]: DefaultAttr.getBody(),
            [Selector.Background]: DefaultAttr.getBackground({
                fill: portsStyle.POSITIVE_BACKGROUND,
                stroke: portsStyle.POSITIVE_STROKE,
            }),
            [Selector.Icon]: DefaultAttr.getIcon({
                xlinkHref: Icon.ControlPositive,
                width: portsStyle.ICON_WIDTH + 6,
                height: portsStyle.ICON_HEIGHT + 6,
            })
        }
    }
}
export const portMarkup = `
<g class="${Selector.removeDot(Selector.Body)}">
    <circle class="${Selector.removeDot(Selector.Background)}"/>
    <use class="${Selector.removeDot(Selector.Icon)}"/>
</g>
`.trim();