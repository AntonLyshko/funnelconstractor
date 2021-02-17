import * as joint from 'rappid';
import * as Port from '@constants/PortConstants';
import * as Shape from '@constants/ShapeConstants';
import { DimensionShapeType } from '@interfaces/Shape.interface';
import {
    BodyShapeConfig,
    ChannelConfig, ClassShapeConfig,
    FooterShapeConfig,
    HeaderShapeConfig, IconShapeConfig, OptionListShapeConfig,
    PortListShapeConfig,
    ShapeDimensionConfig
} from '@interfaces/ShapeConfig.interface';
import { PaperSettings } from '@constants/FlowchartConstants';
import GeometryUtils from '@utils/GeometryUtils';
import PartInitializer from '@flowchart/shapes/element/_PartInitializer';
import { ClassShapeType, PartType } from '@interfaces/Types';
import _ from 'lodash';
import { portsStyle, shapeStyle } from '@constants/StyleConstants';



export const PORTS = {
    ports: {
        groups: {
            [Port.Type.Out]: Port.Markup.OutGroup,
            [Port.Type.Positive]: Port.Markup.PositiveGroup,
            [Port.Type.Negative]: Port.Markup.NegativeGroup,
            [Port.Type.NegativeFooter]: Port.Markup.NegativeFooterGroup,
            [Port.Type.In]: Port.Markup.InGroup,
            [Port.Type.Control]: Port.Markup.ControlGroup,
            [Port.Type.PositiveControl]: Port.Markup.ControlPositiveGroup,
            [Port.Type.NegativeControl]: Port.Markup.ControlNegativeGroup,
        }
    },
    portMarkup: Port.portMarkup,
};

export const MARKUP = {
    attrs: {
        [Shape.Selector.root]: Shape.DefaultAttr.getRoot(),
        text: {
            'font-family': shapeStyle.TEXT_FONT_FAMILY
        },
        [Shape.Selector.shadow]: Shape.DefaultAttr.getShadow(),
        [Shape.Selector.header]: Shape.DefaultAttr.getHeader(),
        [Shape.Selector.headerText]: Shape.DefaultAttr.getHeaderText(),
        [Shape.Selector.headerBackground]: Shape.DefaultAttr.getHeaderBackground(),
        [Shape.Selector.body]: Shape.DefaultAttr.getBody(),
        [Shape.Selector.bodyImage]: Shape.DefaultAttr.getBodyImage(),
        [Shape.Selector.bodyText]: Shape.DefaultAttr.getBodyText(),
        [Shape.Selector.bodyBackground]: Shape.DefaultAttr.getBodyBackground(),
        [Shape.Selector.bodyPreviewTextTop]: Shape.DefaultAttr.getBodyPreviewTextTop(),
        [Shape.Selector.bodyPreviewIcon]: Shape.DefaultAttr.getBodyPreviewIcon(),
        [Shape.Selector.bodyPreviewTextBottom]: Shape.DefaultAttr.getBodyPreviewTextBottom(),

        [Shape.Selector.iconType]: Shape.DefaultAttr.getIconType(),
        [Shape.Selector.iconTypeBackground]: Shape.DefaultAttr.getIconTypeBackground(),
        [Shape.Selector.iconTypeSprite]: Shape.DefaultAttr.getIconTypeSprite(),
        [Shape.Selector.footerServiceCommon]: Shape.DefaultAttr.getFooterServiceCommon(),
        [Shape.Selector.footerText]: Shape.DefaultAttr.getFooterText(),
        [Shape.Selector.footerBackground]: Shape.DefaultAttr.getFooterBackground(),
        [Shape.Selector.option]: Shape.DefaultAttr.getOption(),
        [Shape.Selector.optionText]: Shape.DefaultAttr.getOptionText(),
        [Shape.Selector.optionBackground]: Shape.DefaultAttr.getOptionBackground(),
    },
    markup: Shape.shapeMarkup
}

export default class RectangleShape extends joint.shapes.standard.Rectangle {

    autoresize() {

        const assemblyData: any = {
            heights: {}
        };
        this.calculateMinSize(assemblyData);

        if (!this.initializeParts(assemblyData)) {
            return;
        }

        this.fixShapeSize(assemblyData);
        this.initializePorts(assemblyData)

        this.updatePorts(assemblyData)
        this.attributes['assemblyData'] = assemblyData
    }


    initialize() {

        joint.dia.Element.prototype.initialize.apply(this, arguments);
        const assemblyData: any = {
            heights: {}
        };
        /** Подготовка размеров */
        this.calculateMinSize(assemblyData);
        this.removePorts()
        this.updateIcon(assemblyData);
        /** Инициализация частей */
        if (!this.initializeParts(assemblyData)) {
            // TODO: можно сделать блок с ошибкой
            return;
        }
        this.initializePorts(assemblyData);
        this.fixShapeSize(assemblyData);
        this.attributes['assemblyData'] = assemblyData
    };

    updateIcon(assemblyData: any) {
        const icon: IconShapeConfig = this.get('icon');
        const classShape: ClassShapeConfig = this.get('class');
        const { Selector } = Shape;
        if (!icon) {
            this.attr(`${Selector.iconType}/display`, 'none', { silent: true });
            return;
        }
        if (icon.name) {
            this.attr(`${Selector.iconTypeSprite}/xlinkHref`, '#' + icon.name, { silent: true });
        }
        switch (classShape) {
            case ClassShapeType.CONDITION:
            case ClassShapeType.LISTENER:
            case ClassShapeType.ACTION:
                this.attr(`${Selector.iconTypeBackground}/fill`, shapeStyle.ICON_TYPE_BACKGROUND[classShape], { silent: true });
                break;
        }
    }




    private initializeParts(assemblyData: any): boolean {
        const { Selector } = Shape;
        /** полный доступный список частей */
        const defaultPartInitializerOptions = {
            [PartType.HEADER]: this.updateHeader.bind(this),
            [PartType.BODY]: this.updateBody.bind(this),
            [PartType.OPTIONS]: this.updateOptions.bind(this),
            [PartType.FOOTER]: this.updateFooter.bind(this),
        }
        let partInitializerOptions = {};

        Object.keys(defaultPartInitializerOptions).forEach(partType => {
            const part = this.get(partType);

            if (part.visible) {
                partInitializerOptions[partType] = defaultPartInitializerOptions[partType];
            } else {
                this.attr(`${Shape.Selector[partType]}/display`, 'none');
            }
        });

        const partInitializer = new PartInitializer(partInitializerOptions);


        do {
            partInitializer.initPartHandler(assemblyData, partInitializer);
        } while (partInitializer.next());


        // Check switch 
        if (!this.attributes.switch) {
            this.attr(`${Selector.header}/opacity`, 1, { silent: true });
            this.attr(`${Selector.body}/opacity`, 1, { silent: true });
            this.attr(`${Selector.footer}/opacity`, 1, { silent: true });
            this.attr(`${Selector.options}/opacity`, 1, { silent: true });
        } else {
            this.attr(`${Selector.header}/opacity`, 0.3, { silent: true });
            this.attr(`${Selector.body}/opacity`, 0.3, { silent: true });
            this.attr(`${Selector.footer}/opacity`, 0.3, { silent: true });
            this.attr(`${Selector.options}/opacity`, 0.3, { silent: true });
        }

        return true;
    }

    fixShapeSize(assemblyData: any) {

        const height = RectangleShape.calculateOffset(assemblyData);
        this.attr(`${Shape.Selector.shadow}/width`, assemblyData.width + PaperSettings.GRID_SIZE, { silent: true });
        this.attr(`${Shape.Selector.shadow}/height`, height + PaperSettings.GRID_SIZE, { silent: true });

        this.prop({
            size: {
                width: assemblyData.width,
                height
            }
        });
    }


    updatePorts(assemblyData: any) {
        let ports: PortListShapeConfig = this.get('ports');
        let itemControl = ports.items.find((item: any) => item.group === 'control')
        if (ports.control) {
            if (itemControl) {
                itemControl.args.y = RectangleShape.calculateOffset(assemblyData)
            }
        }
        this.addPort({
            group: 'rerender',
        });
        ports = this.get('ports');
        let reRender = ports.items.find((item: any) => item.group === 'rerender')
        this.removePort(reRender.id)

    }

    initializePorts(assemblyData: any) {

        const ports: PortListShapeConfig = this.get('ports');

        let itemIn = ports.items.find((item: any) => item.group === 'in')
        let itemOut = ports.items.find((item: any) => item.group === 'out')

        let itemControl = ports.items.find((item: any) => item.group === 'control')
        let itemNegativeFooter = ports.items.find((item: any) => item.group === 'negative-footer')



        if (!ports) {
            return;
        }

        if (ports.in && !itemIn) {
            this.addPort({
                group: Port.Type.In
            });

        }

        if (ports.out && !itemOut) {

            if (this.attributes.footer.port) {
                if (!itemNegativeFooter && this.attributes.footer.port.negative) {
                    this.addPort({
                        group: Port.Type.NegativeFooter,
                        args: { x: 0 },
                        id: 'negative-footer'
                    });
                }

            } else {
                this.addPort({
                    group: Port.Type.Out
                });
            }

        }

        if (ports.control && !itemControl) {
            this.addPort({
                group: Port.Type.Control,
                id: 'control',
                args: { x: assemblyData.width, y: RectangleShape.calculateOffset(assemblyData) }
            });

        }
    }


    updateHeader(assemblyData: any, partInitializer: PartInitializer): any {
        const header: HeaderShapeConfig = this.get('header');
        const { DefaultProps, Selector } = Shape;

        /** Обработка смещения блока */
        this.setOffset(assemblyData, Selector.header);

        const { contentHeight, contentWidth, content } = GeometryUtils.formatText(
            header.content,
            this.attr(`${Selector.headerText}/fontSize`),
            this.attr(`${Selector.headerText}/lineHeight`),
            assemblyData.width,
            GeometryUtils.getMaxHeight(header.size, assemblyData),
            { splitBySign: header.splitBySign, roundHeight: header.size.roundHeight }
        );

        assemblyData.heights[PartType.HEADER] = contentHeight;



        this.setPath(assemblyData, Selector.headerBackground, partInitializer);
        this.attr(`${Selector.headerText}/text`, content, { silent: true });
        this.attr(`${Selector.headerText}/refY`, Math.round(contentHeight / 2 - 2), { silent: true });

        this.setAlignText(
            header.textAlign,
            Selector.headerText,
            assemblyData.width,
            DefaultProps.Rectangle.marginX,
            contentWidth
        );
    }


    private updateBody(assemblyData: any, partInitializer: PartInitializer): any {
        const body: BodyShapeConfig = this.get(PartType.BODY);
        const ports: PortListShapeConfig = this.get('ports');


        const { Selector, DefaultProps } = Shape;

        /** Обработка смещения блока */
        this.setOffset(assemblyData, Selector[PartType.BODY]);


        const calcHeight = GeometryUtils.getMaxHeight(body.size, assemblyData);
        let partSize;
        if (body.content) {
            partSize = GeometryUtils.formatText(
                body.content,
                this.attr(`${Selector.bodyText}/fontSize`),
                this.attr(`${Selector.bodyText}/lineHeight`),
                assemblyData.width,
                calcHeight,

                { splitBySign: body.splitBySign, roundHeight: body.size.roundHeight }
            );
        }
        if (body.preview) {

            let previewSize = 0;
            if (body.preview.text && body.preview.text.top) {

                this.attr(`${Selector.bodyPreviewTextTop}/text`, body.preview.text.top, { silent: true });
                this.attr(`${Selector.bodyPreviewTextTop}/refY`, 20, { silent: true });
                //previewSize = previewSize + 20;
            }
            if (body.preview.icon) {
                this.attr(`${Selector.bodyPreviewIcon}/xlinkHref`, `#${body.preview.icon.faId}`, { silent: true });

                if (body.preview.icon.width) {
                    this.attr(`${Selector.bodyPreviewIcon}/width`, body.preview.icon.width, { silent: true });
                }

                if (body.preview.icon.height) {
                    this.attr(`${Selector.bodyPreviewIcon}/height`, body.preview.icon.height, { silent: true });
                }

                this.attr(`${Selector.bodyPreviewIcon}/refY`, 0, { silent: true });
            }
            if (body.preview.text && body.preview.text.bottom) {
                this.attr(`${Selector.bodyPreviewTextBottom}/text`, body.preview.text && body.preview.text.bottom, { silent: true });
                this.attr(`${Selector.bodyPreviewTextBottom}/refY`, 15 + 10, { silent: true });
                //previewSize = previewSize + 20;
            }


            const offsetPreview = (calcHeight.minHeight - previewSize) / 2;
            if (offsetPreview > 0) {
                this.attr(`${Selector.bodyPreview}/refY`, offsetPreview, { silent: true });
            }

            partSize = {
                content: null,
                contentHeight: calcHeight.minHeight,
                contentWidth: 0
            }
        }


        if (this.attributes.preview) {
            assemblyData.heights[PartType.BODY] = 225

        } else {
            assemblyData.heights[PartType.BODY] = partSize.contentHeight;
        }

        this.setPath(assemblyData, Selector.bodyBackground, partInitializer);


        if (partSize.content) {
            if (this.attributes.preview) {
                // Адаптировать
                this.attr(`${Selector.bodyBackground}/height`, 120, { silent: true });
                this.attr(`${Selector.bodyImage}/href`, this.attributes.preview.url, { silent: true });
                this.attr(`${Selector.bodyImage}/refY`, 165, { silent: true });
            } else {
                this.attr(`${Selector.bodyImage}/href`, '', { silent: true });
            }
            this.attr(`${Selector.bodyText}/text`, partSize.content, { silent: true });
            this.attr(`${Selector.bodyText}/refY`, Math.round(partSize.contentHeight / 1.8) - shapeStyle.TEXT_FONT_SIZE / 8, { silent: true });

            this.setAlignText(
                body.textAlign,
                Selector.bodyText,
                assemblyData.width,
                DefaultProps.Rectangle.marginX,
                partSize.contentWidth
            );
        }


        if (body.defaultPort) {
            let portPositive = ports.items.find((item: any) => item.group === 'positive')
            let portNegative = ports.items.find((item: any) => item.group === 'negative')

            const offset = this.offsetTo(PartType.BODY, assemblyData);
            if (body.defaultPort.negative && !portNegative) {
                this.addPort({
                    group: Port.Type.Negative,
                    id: `negative-condition-port`,
                    args: { x: 0, y: offset + assemblyData.heights[PartType.BODY] / 2 }
                });
            }

            if (body.defaultPort.positive && !portPositive) {
                this.addPort({
                    group: Port.Type.Positive,
                    id: `positive-condition-port`,
                    args: { x: assemblyData.width, y: offset + assemblyData.heights[PartType.BODY] / 2 }

                });
            }
        } else if (body.controlPort) {

            let MaxPort = Math.max(body.controlPort.negative, body.controlPort.positive)



            let predicateHeight = 0;

            if (body.controlPort.positive > body.controlPort.negative) {

                predicateHeight = PaperSettings.GRID_SIZE + 2 * portsStyle.PORT_RADIUS + ((body.controlPort.positive - 1) * PaperSettings.GRID_SIZE);
            } else {
                predicateHeight = PaperSettings.GRID_SIZE + 2 * portsStyle.PORT_RADIUS + ((body.controlPort.negative - 1) * PaperSettings.GRID_SIZE);
            }

            let compensation = 35;

            if (partSize.contentHeight > predicateHeight) {
                compensation = Math.round((partSize.contentHeight - predicateHeight) / 2);
            }


            let newHeight = compensation + PaperSettings.GRID_SIZE + portsStyle.PORT_RADIUS;



            let itemPositiveControl = ports.items.filter((item: any) => item.group === 'positive-control')
            let itemNegativeControl = ports.items.filter((item: any) => item.group === 'negative-control')


            if (itemPositiveControl.length && itemNegativeControl.length) {
                //Decrease
                if (itemPositiveControl.length > body.controlPort.positive) {
                    let diff = itemPositiveControl.length - body.controlPort.positive
                    for (let i = 1; i <= diff; i++) {
                        let target = itemPositiveControl[itemPositiveControl.length - i].id
                        this.removePort(target)
                    }
                }
                if (itemNegativeControl.length > body.controlPort.negative) {
                    let diff = itemNegativeControl.length - body.controlPort.negative
                    for (let i = 1; i <= diff; i++) {
                        let target = itemNegativeControl[itemNegativeControl.length - i].id
                        this.removePort(target)
                    }
                }

                //Increase
                if (itemPositiveControl.length < body.controlPort.positive) {
                    let diff = body.controlPort.positive - itemPositiveControl.length



                    for (let i = 1; i <= diff; i++) {
                        this.addPort({
                            group: Port.Type.PositiveControl,
                            id: `positive-control-${itemPositiveControl.length}`
                        });
                    }
                }
                if (itemNegativeControl.length < body.controlPort.negative) {
                    let diff = body.controlPort.negative - itemNegativeControl.length
                    for (let i = 1; i <= diff; i++) {
                        this.addPort({
                            group: Port.Type.NegativeControl,
                            id: `negative-control-${itemPositiveControl.length}`
                        });
                    }
                }
            }






            if (!itemPositiveControl.length) {
                for (let i = 0; i < body.controlPort.positive; i++) {
                    if (i === 15) {
                        break;
                    }
                    this.addPort({
                        group: Port.Type.PositiveControl,
                        id: `positive-control-${i}`
                    });
                }
            }



            if (!itemNegativeControl.length) {
                for (let i = 0; i < body.controlPort.negative; i++) {
                    if (i === 15) {
                        break;
                    }
                    this.addPort({
                        group: Port.Type.NegativeControl,
                        id: `negative-control-${i}`
                    });
                }
            }

            newHeight += PaperSettings.GRID_SIZE * MaxPort;

            if (partSize.contentHeight <= newHeight) {
                assemblyData.heights[PartType.BODY] = newHeight * (MaxPort > 5 ? 1.4 : 1.2);
                this.attr(`${Selector.bodyPreview}/refY`, Math.round(newHeight / (MaxPort > 5 ? 1.45 : 1.8)), { silent: true });
                this.setPath(assemblyData, Selector.bodyBackground, partInitializer);
            }

        }

    }

    setAlignText(textAlign: string, selector: string, width: number, marginX: number, contentWidth: number) {
        switch (textAlign) {
            case 'left':
                this.attr(`${selector}/refX`, Math.round(marginX + contentWidth / 2), { silent: true });
                break;
            case 'right':
                this.attr(`${selector}/refX`, Math.round(width - contentWidth / 2 - marginX), { silent: true });
                break;
        }
    }

    offsetTo(type: string, assemblyData: any) {
        let offsetTo = 0;
        Object.keys(assemblyData.heights).some((part) => {
            if (part !== type) {
                offsetTo += assemblyData.heights[part];
            }
            return part === type;
        })
        return offsetTo;
    }

    private static calculateOffset(assemblyData: any): number {
        return Object.values(assemblyData.heights).reduce((value: number, acc: number) => acc += value, 0)! as number;
    }

    calculateMinSize(assemblyData: any): void {
        const dimension: ShapeDimensionConfig | void = this.get('dimension');
        if (!dimension) {
            return;
        }
        const defaultSize = this.get('size');
        let width = defaultSize.width;
        switch (dimension.type) {
            case DimensionShapeType.PIXEL:
                assemblyData.dimensionType = DimensionShapeType.PIXEL;
                width = dimension.size.width;
                break;
            case DimensionShapeType.SQUARE:
                assemblyData.dimensionType = DimensionShapeType.SQUARE;
                width = dimension.size.width * PaperSettings.GRID_SIZE;
                break;
        }
        assemblyData.width = width;
    }

    setOffset(assemblyData: any, selector: string) {
        /** Обработка смещения блока */
        const offset = RectangleShape.calculateOffset(assemblyData);
        this.attr(`${selector}/refY`, offset, { silent: true });
    }

    setPath(assemblyData: any, selector: string, partInitializer: PartInitializer) {
        const { DefaultProps } = Shape;
        const radius = DefaultProps.Rectangle.BorderRadius;
        const path = Shape.makePath({
            Height: assemblyData.heights[partInitializer.getCurrentPart()],
            Width: assemblyData.width,
            Radius: {
                TR: partInitializer.hasPrev() ? 0 : radius,
                TL: partInitializer.hasPrev() ? 0 : radius,
                BR: partInitializer.hasNext() ? 0 : radius,
                BL: partInitializer.hasNext() ? 0 : radius
            }
        });
        this.attr(`${selector}/d`, path, { silent: true });

    }

    updateOptions(assemblyData: any, partInitializer?: PartInitializer) {

        const ports: PortListShapeConfig = this.get('ports');
        const { Selector, DefaultProps } = Shape;
        const options: OptionListShapeConfig = this.get('options');





        this.setOffset(assemblyData, Selector.options);

        let totalHeight = 0;


        if (options.items) {
            if (options.items.length) {
                options.items.forEach((option, index) => {

                    let { contentHeight, contentWidth, content } = GeometryUtils.formatText(
                        option.content,
                        this.attr(`${Selector.bodyText}/fontSize`),
                        this.attr(`${Selector.bodyText}/lineHeight`),
                        assemblyData.width,
                        { maxHeight: 135, minHeight: 45 },
                        { splitBySign: option.splitBySign, roundHeight: option.size.roundHeight }
                    );


                    this.attr(`${Selector.option}-${index}/refY`, totalHeight, { silent: false });
                    this.attr(`${Selector.optionText}-${index}/refY`, Math.round(contentHeight / 2), { silent: false });

                    this.setAlignText(
                        option.textAlign,
                        `${Selector.optionText}-${index}`,
                        assemblyData.width,
                        DefaultProps.Rectangle.marginX,
                        contentWidth
                    );

                    this.attr(`${Selector.optionText}-${index}/text`, content, { silent: false });
                    this.attr(`${Selector.optionBackground}-${index}/height`, contentHeight, { silent: false });
                    this.attr(`${Selector.optionBackground}-${index}/stroke-dasharray`, `${assemblyData.width} ${assemblyData.width + contentHeight * 2}`, { silent: false });
                    this.attr(`${Selector.optionBackground}-${index}/width`, assemblyData.width, { silent: false });


                    totalHeight += contentHeight;

                    let positiveOption = ports.items.filter((item: any) => item.group === 'positive')

                    if (positiveOption.length > options.items.length) {
                        for (let i = 0; i < positiveOption.length; i++) {
                            if (!options.items[i]) {
                                let splited = positiveOption[i].id.split('-')
                                let id = splited[splited.length - 1]
                                this.removePort('positive-option-port-' + id)
                                this.removePort('negative-option-port-' + id)
                            }
                        }
                    }

                    const offset = RectangleShape.calculateOffset(assemblyData);
                    if (option.port.positive) {
                        if (!this.getPort(`positive-option-port-${index}`)) {
                            this.addPort({
                                group: Port.Type.Positive,
                                id: `positive-option-port-${index}`,
                                args: { x: assemblyData.width, y: offset + totalHeight - contentHeight / 2 }
                            });
                        }
                    }
                    if (option.port.negative) {
                        if (!this.getPort(`negative-option-port-${index}`)) {
                            this.addPort({
                                group: Port.Type.Negative,
                                id: `negative-option-port-${index}`,
                                args: { x: 0, y: offset + totalHeight - contentHeight / 2 }
                            });
                        }
                    }


                })
            } else {

                let positiveOption = ports.items.filter((item: any) => item.group === 'positive')
                let negativeOption = ports.items.filter((item: any) => item.group === 'negative')
                for (let i = 0; i < positiveOption.length; i++) {
                    this.removePort(positiveOption[i].id)
                    if (negativeOption[i]) this.removePort(negativeOption[i].id)
                }
            }
        }
        assemblyData.heights[PartType.OPTIONS] = totalHeight;
    }

    updateFooter(assemblyData: any, partInitializer: PartInitializer): any {
        /** Устанавливаем сервисы */
        const footer: FooterShapeConfig = this.get('footer');
        const channel: ChannelConfig = this.get('channel');
        const { DefaultProps, Selector } = Shape;
        const { widthIcon, heightIcon, marginXIcon } = DefaultProps.Channel;



        /** Обработка смещения блока */
        this.setOffset(assemblyData, Selector.footer);

        // полклетки из-за того что отступы учитываются в тексте
        const channelHeight = PaperSettings.GRID_SIZE / 2 + heightIcon;


        let totalHeight = 0;
        const footerSize = GeometryUtils.getMaxHeight(footer.size, assemblyData);
        const textSize = {
            minHeight: 0,
            maxHeight: 0,
        };
        textSize.minHeight = footerSize.minHeight - channelHeight;
        textSize.maxHeight = footerSize.maxHeight - channelHeight;

        if (footer.content) {

            const { contentHeight, contentWidth, content } = GeometryUtils.formatText(
                footer.content,
                this.attr(`${Selector.footerText}/fontSize`),
                this.attr(`${Selector.footerText}/lineHeight`),
                assemblyData.width,
                textSize,
                { splitBySign: footer.splitBySign, roundHeight: footer.size.roundHeight }
            );


            totalHeight += contentHeight;
            this.attr(`${Selector.footerText}/text`, content, { silent: true });
            this.attr(`${Selector.footerText}/refY`, Math.round(contentHeight / 2) - 2, { silent: true });
            this.setAlignText(
                footer.textAlign,
                Selector.bodyText,
                assemblyData.width,
                DefaultProps.Rectangle.marginX,
                contentWidth
            );
        }

        if (footer.preset.channel) {
            const enabledChannels = {};
            let visibleChannels = 0;

            Object.entries(channel).forEach(([channelName, value]) => {
                if (_.isBoolean(value)) {
                    enabledChannels[channelName] = value;
                    visibleChannels++;
                }
            });
            const totalWidthOffset = widthIcon * visibleChannels
                + marginXIcon * (visibleChannels - 1);

            Object.entries(enabledChannels).forEach(([channelName, value], index) => {
                const offset = Math.round(widthIcon * (marginXIcon / widthIcon + 1) * index);
                this.attr(`${Selector.footerService}${channelName}/refX`, offset, { silent: true });
                this.attr(`${Selector.footerService}${channelName}/display`, 'block', { silent: true });
            });

            const serviceGroupWidthOffset = (assemblyData.width - totalWidthOffset) / 2;
            const serviceGroupHeightOffset = !footer.content ? footerSize.minHeight / 2 - heightIcon / 2 : totalHeight;
            this.attr(`${Selector.footerServiceGroup}/refX`, serviceGroupWidthOffset, { silent: true });
            this.attr(`${Selector.footerServiceGroup}/refY`, serviceGroupHeightOffset, { silent: true });

            /** Инициализация сервисов */
            Object.entries(enabledChannels).forEach(([key, value]) => {
                this.attr(`${Selector.footerService}${key}/data-active`, value, { silent: true });
            })
            totalHeight += channelHeight;
        }
        /** Установка высоты после установки сдвига, так как рассчитывается на основе суммы высот */
        assemblyData.heights[PartType.FOOTER] = !footer.content ? footerSize.minHeight : totalHeight;

        this.setPath(assemblyData, Selector.footerBackground, partInitializer);

    }


    defaults() {
        return joint.util.defaultsDeep({
            z: Shape.DefaultProps.Rectangle.Z,
            size: {
                width: Shape.DefaultProps.Rectangle.Width,
                height: Shape.DefaultProps.Rectangle.Height,
            },
            removable: true,
            ...PORTS,
            ...MARKUP,
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}
