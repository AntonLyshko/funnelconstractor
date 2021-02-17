import * as joint from 'rappid';
import RectangleShape, { PORTS } from '@flowchart/shapes/element/RectangleShape';
import { BodyShapeConfig, PortListShapeConfig } from '@interfaces/ShapeConfig.interface';
import { PartType } from '@interfaces/Types';
import * as Shape from '@constants/ShapeConstants';
import { portsStyle, shapeStyle } from '@constants/StyleConstants';
import * as Port from '@constants/PortConstants';
import { PaperSettings } from '@constants/FlowchartConstants';

const MARKUP = {
    attrs: {
        [Shape.Selector.root]: Shape.DefaultAttr.getRoot(),
        text: {
            'font-family': shapeStyle.TEXT_FONT_FAMILY
        },
        [Shape.Selector.shadowCircle]: Shape.DefaultAttr.getShadowCircle(),
        [Shape.Selector.header]: Shape.DefaultAttr.getHeader(),

        [Shape.Selector.body]: Shape.DefaultAttr.getBody(),
        [Shape.Selector.bodyCircleBackground]: Shape.DefaultAttr.getBodyCircleBackground(),

        [Shape.Selector.bodyPreviewTextTop]: Shape.DefaultAttr.getBodyPreviewTextTop(),
        [Shape.Selector.bodyPreviewIcon]: Shape.DefaultAttr.getBodyPreviewIcon(),
        [Shape.Selector.bodyPreviewTextBottom]: Shape.DefaultAttr.getBodyPreviewTextBottom(),

    },
    markup: Shape.shapeCircleMarkup
}

export default class CircleShape extends RectangleShape {

    autoresize() {

        const assemblyData: any = {
            heights: {}
        };

        /** Подготовка размеров */
        this.calculateMinSize(assemblyData);
        this.updateIcon(assemblyData);

        this.updatePreview(assemblyData);

        /** Завершение инициализации */
        this.fixShapeSize(assemblyData);

    }

    initialize() {
        joint.dia.Element.prototype.initialize.apply(this, arguments);


        const assemblyData: any = {
            heights: {}
        };

        /** Подготовка размеров */
        this.calculateMinSize(assemblyData);
        this.updateIcon(assemblyData);

        this.updatePreview(assemblyData);

        /** Завершение инициализации */
        this.initializePorts(assemblyData);
        this.fixShapeSize(assemblyData);
    };

    initializePorts(assemblyData: any) {
        const ports: PortListShapeConfig = this.get('ports');

        if (!ports) {
            return;
        }

        if (!this.getPort('in') && ports.in) {
            this.addPort({
                group: Port.Type.In,
            });
        }

        if (!this.getPort('out') && ports.out) {
            this.addPort({
                group: Port.Type.Out,
            });
        }


        if (!this.getPort('control') && ports.control) {
            this.addPort({
                group: Port.Type.Control,
                id: 'control',
                args: { x: 0, y: Math.round(assemblyData.width / 2) }
            });
        }
    }

    fixShapeSize(assemblyData: any) {
        this.attr(`${Shape.Selector.shadowCircle}/r`, assemblyData.width / 2 + PaperSettings.GRID_SIZE / 2, { silent: true });
        this.attr(`${Shape.Selector.bodyCircleBackground}/r`, assemblyData.width / 2, { silent: true });


        this.attr(`${Shape.Selector.bodyCircleBackground}/cx`, assemblyData.width / 2, { silent: true });
        this.attr(`${Shape.Selector.bodyCircleBackground}/cy`, assemblyData.width / 2, { silent: true });
        this.attr(`${Shape.Selector.shadowCircle}/cx`, assemblyData.width / 2 + PaperSettings.GRID_SIZE / 2, { silent: true });
        this.attr(`${Shape.Selector.shadowCircle}/cy`, assemblyData.width / 2 + PaperSettings.GRID_SIZE / 2, { silent: true });


        this.attr(`${Shape.Selector.body}/refX`, 0, { silent: true });
        this.attr(`${Shape.Selector.body}/refY`, 0, { silent: true });

        this.prop({
            size: {
                width: assemblyData.width,
                height: assemblyData.width
            }
        });
    }

    private updatePreview(assemblyData: any) {
        const body: BodyShapeConfig = this.get(PartType.BODY);

        const { Selector } = Shape;
        const iconRadius = (PaperSettings.GRID_SIZE - 2) / 2;
        const offset = iconRadius + portsStyle.PORT_RADIUS;
        const useful = (assemblyData.width / 2) - offset;

        //  Check Switch
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

        if (body.preview) {
            if (body.preview.text && body.preview.text.top) {
                this.attr(`${Selector.bodyPreviewTextTop}/text`, body.preview.text.top, { silent: true });
                this.attr(`${Selector.bodyPreviewTextTop}/refY`, Math.round(portsStyle.PORT_RADIUS + useful / 2), { silent: true });
            }
            if (body.preview.icon) {
                this.attr(`${Selector.bodyPreviewIcon}/xlinkHref`, `#${body.preview.icon.faId}`, { silent: true });
                this.attr(`${Selector.bodyPreviewIcon}/refY`, assemblyData.width / 2, { silent: true });
            }

            if (body.preview.icon.width) {
                this.attr(`${Selector.bodyPreviewIcon}/width`, body.preview.icon.width, { silent: true });
            }

            if (body.preview.icon.height) {
                this.attr(`${Selector.bodyPreviewIcon}/height`, body.preview.icon.height, { silent: true });
            }

            if (body.preview.text && body.preview.text.bottom) {
                this.attr(`${Selector.bodyPreviewTextBottom}/text`, body.preview.text.bottom, { silent: true });
                this.attr(`${Selector.bodyPreviewTextBottom}/refY`, Math.round(assemblyData.width - portsStyle.PORT_RADIUS - useful / 2), { silent: true });
            }

            const offsetPreview = assemblyData.width / 2;
            if (offsetPreview > 0) {
                this.attr(`${Selector.bodyPreview}/refY`, 0, { silent: true });
            }
        }
        if (body.defaultPort) {
            if (!this.getPort('negative-body-port') && body.defaultPort.negative) {
                this.addPort({
                    group: Port.Type.Negative,
                    id: 'negative-body-port',
                    args: { x: assemblyData.width, y: assemblyData.width / 2 }
                });
            } else if (!this.getPort('positive-body-port') && body.defaultPort.positive) {
                this.addPort({
                    group: Port.Type.Positive,
                    id: 'positive-body-port',
                    args: { x: assemblyData.width, y: assemblyData.width / 2 }
                });
            }
        }
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