import * as joint from 'rappid';
import { PAGE_GRID_SIZE } from '@constants/FlowchartConstants';


const ICON_SIZE = 15;
const SHAPE_WIDTH = PAGE_GRID_SIZE * 5;
const SHAPE_HEIGHT = PAGE_GRID_SIZE * 4;

export const PORT_MARKUP = {
    ports: {
        groups: {
            out: {
                position: {
                    name: 'bottom'
                },
                attrs: {

                    '.shape-port-body': {
                        magnet: 'active',
                        cursor: 'pointer',
                        z: 10,
                    },
                    circle: {
                        'data-background': true,
                        r: 12,
                    },
                    '.shape-port-icon': {
                        width: 10,
                        height: 10,
                        yAlignment: 'middle',
                        xAlignment: 'middle',
                        refX: .5,
                        refY: .5,
                        xlinkHref: '#arrow-down'
                    }
                }
            },
            negativeBottom: {
                position: {
                    name: 'negativeBottom'
                },
                attrs: {
                    '.shape-port-body': {
                        magnet: 'active',
                        cursor: 'pointer',
                        z: 10,
                    },
                    circle: {
                        'data-background': true,
                        r: 12,
                    },
                    '.shape-port-icon': {
                        width: 10,
                        height: 10,
                        yAlignment: 'middle',
                        xAlignment: 'middle',
                        refX: .5,
                        refY: .5,
                        xlinkHref: '#arrow-down'
                    }
                }
            },
            positive: {
                position: {
                    name: 'right'
                },
                attrs: {
                    '.shape-port-body': {
                        magnet: 'active',
                        cursor: 'pointer',
                    },
                    circle: {
                        'data-background': true,
                        r: 12,
                    },
                    '.shape-port-icon': {
                        width: 10,
                        height: 10,
                        yAlignment: 'middle',
                        xAlignment: 'middle',
                        refX: .5,
                        refY: .5,
                        xlinkHref: '#plus'
                    }
                }
            },
            negative: {
                position: {
                    name: 'left'
                },
                attrs: {
                    '.shape-port-body': {
                        magnet: 'active',
                        cursor: 'pointer',
                    },
                    circle: {
                        'data-background': true,
                        r: 12,
                    },
                    '.shape-port-icon': {
                        width: 10,
                        height: 10,
                        yAlignment: 'middle',
                        xAlignment: 'middle',
                        refX: .5,
                        refY: .5,
                        xlinkHref: '#minus'
                    }
                }
            },
            in: {
                position: {
                    name: 'top'
                },
                attrs: {
                    '.shape-port-body': {
                        magnet: 'passive',
                        cursor: 'pointer',
                    },
                    circle: {
                        'data-background': true,
                        r: 12,
                    },
                    '.shape-port-icon': {
                        width: 10,
                        height: 10,
                        yAlignment: 'middle',
                        xAlignment: 'middle',
                        refX: .5,
                        refY: .5,
                        xlinkHref: '#arrow-down'
                    }
                }
            }
        }
    },
    portMarkup: '<g class="shape-port-body"><circle/><use class="shape-port-icon"/></g>',
};

export const MARKUP = {
    attrs: {
        '.': {
            magnet: false
        },
        '.shape-body': {
            refWidth: '100%',
            refHeight: '100%',
            fill: 'rgba(255,255,255,0.75)',
            rx: 10,
            ry: 10,
        },
        text: {
            fontFamily: 'Arial'
        },
        '.shape-icon': {
            width: ICON_SIZE,
            height: ICON_SIZE,
            refX: `${PAGE_GRID_SIZE / 2}px`,
            refY: `${-ICON_SIZE / 2}px`,
        },
        '.shape-content': {
            refX: .5,
            refY: .5,
            refWidth: '100%',
            refHeight: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: 21,
        }
    },
    markup: (
        '<rect class="shape-body"/>' +
        '<text class="shape-content"/>' +
        '<use class="shape-icon"/>'
    )
}

export const STYLE_PARAMS = {
    z: 10,
    size: {
        width: SHAPE_WIDTH,
        height: SHAPE_HEIGHT,
    },
    removable: true
};

const measureText = (txt: string, fontSize: number, lineHeight?: number) => {
    const lines = txt.split('\n');
    const signHeight = lineHeight ? lineHeight : fontSize;
    return Math.round(lines.length * signHeight);
};

export default class _BaseElementModel extends joint.shapes.standard.Rectangle {



    initialize() {
        joint.dia.Element.prototype.initialize.apply(this, arguments);
        this.autoresize();
        this.on('change:content', this.autoresize, this);
        this.attr('.shape-icon/xlinkHref', this.get('iconId'), { silent: true });
    };

    autoresize() {
        const content = joint.util.breakText(this.get('content'), {
            width: SHAPE_WIDTH
        });

        const height = measureText(
            content,
            this.attr('.shape-content/fontSize'),
            this.attr('.shape-content/lineHeight'),
        );

        const nextHeight = (Math.trunc(((height + PAGE_GRID_SIZE) / PAGE_GRID_SIZE)) + 1) * PAGE_GRID_SIZE;

        this.prop({
            attrs: { '.shape-content': { text: content } },
            size: { width: SHAPE_WIDTH + PAGE_GRID_SIZE, height: nextHeight }
        });
    };

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}
