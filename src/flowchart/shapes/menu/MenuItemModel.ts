import * as joint from 'rappid';
import { shapeStyle } from '@constants/StyleConstants';

export class MenuItemModel extends joint.shapes.standard.Rectangle {


    initialize() {
        switch (this.attributes.shape.class) {
            case 'action':
                this.attr('.stencil-menu-body/fill', '#26ae60', { silent: true });
                this.attr('.stencil-menu-body/class', 'stencil-menu-body green', { silent: true });
                break;
            case 'listener':
                this.attr('.stencil-menu-body/fill', '#f39c12', { silent: true });
                this.attr('.stencil-menu-body/class', 'stencil-menu-body orange', { silent: true });
                break;
            case 'condition':
                this.attr('.stencil-menu-body/fill', '#3498db', { silent: true });
                this.attr('.stencil-menu-body/class', 'stencil-menu-body blue', { silent: true });
                this.set('class', 'blue', { silent: true })
                break;


            default:
                break;
        }

        joint.dia.Element.prototype.initialize.apply(this, arguments);

        this.attr('.stencil-menu-label/text', this.get('text'), { silent: true });
        this.attr('./data-category-item', this.get('text'), { silent: true });
        this.attr('.stencil-menu-icon/xlinkHref', '#' + this.get('icon'), { silent: true });
    };

    defaults() {


        return joint.util.defaultsDeep({
            type: 'app.MenuModel',
            size: { width: 70, height: 70 },
            attrs: {
                '.': {
                    magnet: true
                },
                text: {
                    'font-family': shapeStyle.TEXT_FONT_FAMILY
                },
                '.stencil-menu-body': {
                    refWidth: '100%',
                    refHeight: '100%',
                    rx: 0,
                    ry: 0,
                    fill: '#2D3E50',
                    stroke: '#34495E',
                    strokeWidth: 1,
                },
                '.stencil-menu-icon': {
                    width: 20,
                    height: 20,
                    fill: '#ffffff',
                    refX: '26px',
                    refY: '8px',

                },
                '.stencil-menu-label': {
                    fill: '#ffffff',
                    refX: '50%',
                    refY: '40px',
                    fontSize: 11,
                    textAnchor: 'middle',
                }
            },
            markup: (
                `<rect class="stencil-menu-body"/>` +
                '<text class="stencil-menu-label"/>' +
                '<use class="stencil-menu-icon"/>'
            ),
        }, joint.shapes.standard.Rectangle.prototype.defaults);


    }

}
