import { shapeStyle } from '@constants/StyleConstants';
import { PaperSettings } from '@constants/FlowchartConstants';
import GeometryUtils from '@utils/GeometryUtils';
import { Channel, ChannelIcon } from '@constants/ChannelConstants';
import { ClassShapeType, PathParams } from '@interfaces/Types';
import _ from 'lodash';


export namespace DefaultProps {
    export const Rectangle = {
        Width: PaperSettings.GRID_SIZE * 6,
        Height: PaperSettings.GRID_SIZE * 6,
        BorderRadius: 10,
        Z: 10,
        marginX: Math.round(PaperSettings.GRID_SIZE / 2),
        marginY: Math.round(PaperSettings.GRID_SIZE / 2),
    }

    export const Path: PathParams = {
        PathX: 0,
        PathY: 0,
        Width: Rectangle.Width,
        Height: PaperSettings.GRID_SIZE * 1.5,
        Radius: {
            BR: 0,
            TR: 0,
            TL: 0,
            BL: 0
        }
    }

    export const Channel = {
        widthIcon: 15,
        heightIcon: 15,
        marginXIcon: 5
    } as const;

    export const IconType = {
        offsetX: PaperSettings.GRID_SIZE,
        radius: 16,
        width: 20,
        height: 20
    }
}

export namespace Selector {
    export const root = '.';

    export const shadow = '.shape-shadow';
    export const shadowCircle = '.shape-shadow-circle';
    export const header = '.shape-header';
    export const headerText = '.shape-header-text';
    export const headerBackground = '.shape-header-background';

    export const body = '.shape-body';
    export const bodyImage = '.shape-body-image';
    export const bodyText = '.shape-body-text';
    export const bodyBackground = '.shape-body-background';
    export const bodyBackgroundDark = '.shape-body-background.dark';
    export const bodyCircleBackground = '.shape-body-circle-background';

    export const bodyPreview = '.shape-body-preview';
    export const bodyPreviewTextTop = '.shape-body-preview-text-top';
    export const bodyPreviewIcon = '.shape-body-preview-icon';
    export const bodyPreviewTextBottom = '.shape-body-preview-text-bottom';

    export const footer = '.shape-footer';
    /** Нужно добавить сервис из константы Services */
    export const footerService = '.shape-footer-service-';
    /** Общий класс */
    export const footerServiceCommon = '.shape-footer-service';
    export const footerText = '.shape-footer-text';
    export const footerServiceGroup = '.shape-footer-service-group';
    export const footerBackground = '.shape-footer-background';

    export const iconType = '.shape-icon-type';
    export const iconTypeBackground = '.shape-icon-type-background';
    export const iconTypeSprite = '.shape-icon-type-sprite';

    export const options = '.shape-options';
    export const option = '.shape-option';
    export const optionBackground = '.shape-option-background';
    export const optionText = '.shape-option-text';
    export const removeDot = (selector: string) => selector.replace('.', '');
}

export namespace DefaultAttr {
    export const getRoot = <T extends object>(attrs?: T) => {
        return {
            magnet: false,
            ...attrs,
        }
    }
    export const getBody = <T extends object>(attrs?: T) => {
        return {
            ...attrs,
        }
    }
    export const getBodyText = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            refY: 0,
            fill: shapeStyle.TEXT_COLOR,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }

    export const getBodyImage = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            refY: 0,
            refWidth: '90%',
            refHeight: '90%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            ...attrs,
        }
    }

    export const getBodyBackground = <T extends object>(attrs?: T) => {
        return {
            refWidth: '100%',
            refHeight: '100%',
            fill: shapeStyle.BACKGROUND,
            ...attrs,
        }
    }

    export const getBodyBackgroundDark = <T extends object>(attrs?: T) => {
        return {
            refWidth: '100%',
            refHeight: '100%',
            fill: shapeStyle.BACKGROUND_DARK,
            ...attrs,
        }
    }



    export const getBodyCircleBackground = <T extends object>(attrs?: T) => {
        return {
            // refWidth: '100%',
            //  refHeight: '100%',
            // yAlignment: 'middle',
            // xAlignment: 'middle',
            cy: 0,
            cx: 0,
            r: 10,
            fill: shapeStyle.BACKGROUND,
            ...attrs,
        }
    }


    export const getHeader = <T extends object>(attrs?: T) => {
        return {
            ...attrs,
        }
    }
    export const getHeaderText = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            fill: shapeStyle.HEADER_TEXT_COLOR,
            refY: 0,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }

    export const getHeaderBackground = <T extends object>(attrs?: T) => {
        return {
            refWidth: '100%',
            refHeight: '100%',
            fill: shapeStyle.HEADER_BACKGROUND,
            ...attrs,
        }
    }

    export const getIconType = <T extends object>(attrs?: T) => {
        return {
            refX: DefaultProps.IconType.offsetX,
            ...attrs,
        }
    }

    export const getIconTypeBackground = <T extends object>(attrs?: T) => {
        return {
            r: DefaultProps.IconType.radius,
            fill: shapeStyle.ICON_TYPE_BACKGROUND[ClassShapeType.LISTENER],
            yAlignment: 'middle',
            xAlignment: 'middle',
            ...attrs,
        }
    }

    export const getIconTypeSprite = <T extends object>(attrs?: T) => {
        return {
            fill: shapeStyle.ICON_TYPE_COLOR,
            width: DefaultProps.IconType.width,
            height: DefaultProps.IconType.height,
            yAlignment: 'middle',
            xAlignment: 'middle',
            xlinkHref: '#gear',
            ...attrs,
        }
    }

    export const getFooterServiceCommon = <T extends object>(attrs?: T) => {
        return {
            fill: shapeStyle.SERVICE_ENABLED_COLOR,
            width: DefaultProps.Channel.widthIcon,
            height: DefaultProps.Channel.heightIcon,
            display: 'none',
            ...attrs,
        }
    }

    export const getFooterBackground = <T extends object>(attrs?: T) => {
        return {
            fill: shapeStyle.FOOTER_BACKGROUND,
            ...attrs,
        }
    }

    export const getOption = <T extends object>(attrs?: T) => {
        return {
            ...attrs,
        }
    }

    export const getOptionText = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            fill: shapeStyle.TEXT_COLOR,
            refY: 0,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }

    export const getOptionBackground = <T extends object>(attrs?: T) => {
        return {
            refWidth: '100%',
            fill: shapeStyle.BACKGROUND,
            stroke: shapeStyle.OPTION_BORDER_COLOR,
            ...attrs,
        }
    }

    export const getShadow = <T extends object>(attrs?: T) => {
        return {
            opacity: 0,
            refX: -PaperSettings.GRID_SIZE / 2,
            refY: -PaperSettings.GRID_SIZE / 2,
            ...attrs,
        }
    }

    export const getShadowCircle = <T extends object>(attrs?: T) => {
        return {
            opacity: 0,
            r: PaperSettings.GRID_SIZE,
            refX: -PaperSettings.GRID_SIZE / 2,
            refY: -PaperSettings.GRID_SIZE / 2,
            cy: 0,
            cx: 0,
            ...attrs,
        }
    }

    export const getBodyPreviewTextTop = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            fill: shapeStyle.TEXT_COLOR,
            refY: 0,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }
    export const getBodyPreviewTextBottom = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            fill: shapeStyle.TEXT_COLOR,
            refY: 0,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }
    export const getBodyPreviewIcon = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            yAlignment: 'middle',
            xAlignment: 'middle',
            fill: shapeStyle.PREVIEW_ICON_COLOR,
            width: PaperSettings.GRID_SIZE - 2,
            height: PaperSettings.GRID_SIZE - 2,
            ...attrs,
        }
    }
    export const getFooterText = <T extends object>(attrs?: T) => {
        return {
            refX: 0.5,
            fill: shapeStyle.TEXT_COLOR,
            refY: 0,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: shapeStyle.TEXT_LINE_HEIGHT,
            fontSize: shapeStyle.TEXT_FONT_SIZE,
            ...attrs,
        }
    }
}

export const makePath = <T extends PathParams>(args?: T) => {
    const defPath = _.cloneDeep(DefaultProps.Path);
    const nextArg = _.merge(defPath, args);
    // nextArg.Width = nextArg.Width - 1;
    //nextArg.PathX = nextArg.PathX + 1;
    return GeometryUtils.makePath(nextArg);
}

export const shapeShadow = `
<rect class="${Selector.removeDot(Selector.shadow)}"/>
`.trim();

export const shapeCircleShadow = `
<circle class="${Selector.removeDot(Selector.shadowCircle)}"/>
`.trim();


export const headerMarkup = `
<g class="${Selector.removeDot(Selector.header)}">
    <path d="${makePath()}" class="${Selector.removeDot(Selector.headerBackground)}"/>
    <text class="${Selector.removeDot(Selector.headerText)}"/>
</g>`.trim();

export const bodyPreviewMarkup = `
<g class="${Selector.removeDot(Selector.bodyPreview)}">
    <text class="${Selector.removeDot(Selector.bodyPreviewTextTop)}"/>
    <use class="${Selector.removeDot(Selector.bodyPreviewIcon)}"/>
    <text class="${Selector.removeDot(Selector.bodyPreviewTextBottom)}"/>
</g>`.trim();


export const bodyMarkupImage = `
<g class="${Selector.removeDot(Selector.bodyImage)}">
   
</g>`.trim()

export const bodyMarkup = `
<g class="${Selector.removeDot(Selector.body)}">
    <path d="${makePath()}" class="${Selector.removeDot(Selector.bodyBackground)}"/>
    <text class="${Selector.removeDot(Selector.bodyText)}"/>
    ${bodyPreviewMarkup}
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <image class="${Selector.removeDot(Selector.bodyImage)}" href="" height="200" width="200" alt=""  />
    </svg>
</g>`.trim();


export const bodyCircleMarkup = `
<g class="${Selector.removeDot(Selector.body)}">
    <circle class="${Selector.removeDot(Selector.bodyCircleBackground)}"/>
    ${bodyPreviewMarkup}
</g>`.trim();

export const footerMarkup = `
<g class="${Selector.removeDot(Selector.footer)}">
    <path d="${makePath()}" class="${Selector.removeDot(Selector.footerBackground)}"/>
    <g class="${Selector.removeDot(Selector.footerServiceGroup)}">
        ${Object.entries(Channel).map(([key, service]) => {
    return `<use data-active="true" xlink:href="${ChannelIcon[key]}" class="${Selector.removeDot(Selector.footerServiceCommon)} ${Selector.removeDot(Selector.footerService)}${service}"/>`
}).join('')}
    </g>
     <text class="${Selector.removeDot(Selector.footerText)}"/>
</g>`.trim();

export const iconMarkup = `
<g class="${Selector.removeDot(Selector.iconType)}">
    <circle r="10" class="${Selector.removeDot(Selector.iconTypeBackground)}"/>
    <use class="${Selector.removeDot(Selector.iconTypeSprite)}"/>
</g>`.trim();

export const optionsMarkup = `
<g class="${Selector.removeDot(Selector.options)}">
</g>
`.trim();

export const optionMarkup = `
<g class="${Selector.removeDot(Selector.option)}">
    <rect class="${Selector.removeDot(Selector.optionBackground)}"/>
    <text class="${Selector.removeDot(Selector.optionText)}"/>
</g>
`.trim();

export const shapeMarkup = `
${shapeShadow}
${headerMarkup}
${bodyMarkup}
${optionsMarkup}
${footerMarkup}
${iconMarkup}
`.trim();

export const shapeCircleMarkup = `
${shapeCircleShadow}
${bodyCircleMarkup}
`.trim();
