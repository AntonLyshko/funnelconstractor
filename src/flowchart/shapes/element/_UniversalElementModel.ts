import * as joint from 'rappid';

// TODO: Нужен полный рефактор и оптимизация, пока что хардкод

import { PAGE_GRID_SIZE } from '@constants/FlowchartConstants';
import { PORT_MARKUP } from '@flowchart/shapes/element/_BaseElementModel';

const ICON_SIZE = 15;
const SHAPE_WIDTH = PAGE_GRID_SIZE * 5;
const SHAPE_HEIGHT = PAGE_GRID_SIZE * 4;


var arcParameter = function (rx: any, ry: any, xAxisRotation: any, largeArcFlag: any, sweepFlag: any, x: any, y: any) {
    return [rx, ',', ry, ' ',
        xAxisRotation, ' ',
        largeArcFlag, ',',
        sweepFlag, ' ',
        x, ',', y].join('');
};

/*
 * Generate a path's data attribute
 *
 * @param {Number} width Width of the rectangular shape
 * @param {Number} height Height of the rectangular shape
 * @param {Number} tr Top border radius of the rectangular shape
 * @param {Number} br Bottom border radius of the rectangular shape
 * @return {String} a path's data attribute value
 */
var generatePathData = function (x: any, y: any, width: any, height: any, tr: any, br: any, bl: any, tl: any) {
    var data = [];

    // start point in top-middle of the rectangle
    data.push('M' + (x + width / 2) + ',' + y);

    // next we go to the right
    data.push('H' + (x + width - tr));

    if (tr > 0) {
        // now we draw the arc in the top-right corner
        data.push('A' + arcParameter(tr, tr, 0, 0, 1, (x + width), (y + tr)));
    }

    // next we go down
    data.push('V' + (y + height - br));

    if (br > 0) {
        // now we draw the arc in the lower-right corner
        data.push('A' + arcParameter(br, br, 0, 0, 1, (x + width - br), (y + height)));
    }

    // now we go to the left
    data.push('H' + (x + bl));

    if (bl > 0) {
        // now we draw the arc in the lower-left corner
        data.push('A' + arcParameter(bl, bl, 0, 0, 1, (x + 0), (y + height - bl)));
    }

    // next we go up
    data.push('V' + (y + tl));

    if (tl > 0) {
        // now we draw the arc in the top-left corner
        data.push('A' + arcParameter(tl, tl, 0, 0, 1, (x + tl), (y + 0)));
    }

    // and we close the path
    data.push('Z');

    return data.join(' ');
};

export const MARKUP = {
    attrs: {
        '.': {
            magnet: false
        },
        '.shape-body': {
            refWidth: '100%',
            refHeight: '100%',
            rx: 10,
            ry: 10,
        },
        text: {
            fontFamily: 'Arial'
        },
        '.shape-icon': {
            width: ICON_SIZE,
            height: ICON_SIZE,
            opacity: 1,
            refX: `${PAGE_GRID_SIZE / 2}px`,
            refY: `${-ICON_SIZE / 2}px`,
        },
        '.universal-shape-icon-bg': {
            width: ICON_SIZE,
            height: ICON_SIZE,
            opacity: 1,
            r: ICON_SIZE - 1,
            refX: `22px`,
            refY: `-1px`
        },
        '.universal-shape-header-bg': {
            refWidth: '100%'
        },
        '.universal-shape-header-text': {
            refX: .5,
            refY: 25,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            lineHeight: 21,
        },
        '.universal-shape-footer-bg': {
            refWidth: '100%'
        },
        '.universal-shape-footer-text': {
            refX: .5,
            refY: 25,
            refWidth: '100%',
            yAlignment: 'middle',
            xAlignment: 'middle',
        },
        '.option-text': {
            refY: 13,
            refX: .5,
            yAlignment: 'middle',
            xAlignment: 'middle',
            height: 30,
            refWidth: '100%',
            textAnchor: 'middle'
        },
        '.universal-content': {
            refWidth: '100%',
        }
    },
    markup: '<rect class="shape-body"/>' +
        '<g class="universal-shape-header">' +
        '<path d="' + generatePathData(0, 0, SHAPE_WIDTH, 50, 5, 0, 0, 5) + '" class="universal-shape-header-bg"/>' +
        '<text class="universal-shape-header-text"/>' +
        '</g>  ' +
        '<g class="universal-content">' +
        '<g class="option-1"><rect class="option-rect"/><text class="option-text option-text-1"/></g>' +
        '<g class="option-2"><rect class="option-rect"/><text class="option-text option-text-2"/></g>' +
        '<g class="option-3"><rect class="option-rect"/><text class="option-text option-text-3"/></g>' +
        '</g>' +
        '<g class="universal-shape-footer">' +
        '<path d="' + generatePathData(0, 0, SHAPE_WIDTH, 50, 0, 5, 5, 0) + '" class="universal-shape-footer-bg"/>' +
        '<text class="universal-shape-footer-text"/>' +
        '</g>  ' +
        '<g class="universal-shape-icon">' +
        '<circle class="universal-shape-icon-bg"/>' +
        '<use class="shape-icon"/>' +
        '</g>'
}

export const STYLE_PARAMS = {
    z: 10,
    size: {
        width: SHAPE_WIDTH,
        height: SHAPE_HEIGHT,
    },
    headerLabel: 'Шапка',
    footerLabel: 'Футер',
    footerHeight: 50,
    headerHeight: 50,
    contentHeight: 90,
    optionHeight: 30,
    removable: true
};

// const measureText = (txt: string, fontSize: number, lineHeight?: number) => {
//     const lines = txt.split('\n');
//     const signHeight = lineHeight ? lineHeight : fontSize;
//     return Math.round(lines.length * signHeight);
// }

export default class _UniversalElementModel extends joint.shapes.standard.Rectangle {

    initialize() {
        joint.dia.Element.prototype.initialize.apply(this, arguments);
        const keys = {
            headerLabel: '.universal-shape-header-text/text',
            footerLabel: '.universal-shape-footer-text/text',
            contentGroupOffset: '.universal-content/refY',
            headerGroupOffset: '.universal-shape-header/refY',
            footerGroupOffset: '.universal-shape-footer/refY',
        };

        this.onChangeOptions();
        this.on('change:options', this.onChangeOptions, this);

        const contentOffset = this.get('headerHeight');
        const footerOffset = contentOffset + this.get('contentHeight');


        this.attr('.shape-icon/xlinkHref', this.get('iconId'), { silent: true });

        this.attr('.option-text-1/text', 'Option 1', { silent: true });
        this.attr('.option-text-2/text', 'Option 2', { silent: true });
        this.attr('.option-text-3/text', 'Option 3', { silent: true });


        this.attr('.option-1/refY', 0, { silent: true });
        this.attr('.option-2/refY', 30, { silent: true });
        this.attr('.option-3/refY', 60, { silent: true });

        this.attr(keys.headerLabel, this.get('headerLabel'), { silent: true });

        this.attr('.universal-shape-header-bg/height', this.get('headerHeight'), { silent: true });
        this.attr('.universal-shape-footer-bg/height', this.get('footerHeight'), { silent: true });

        this.attr(keys.footerLabel, this.get('footerLabel'), { silent: true });


        this.attr(keys.contentGroupOffset, contentOffset, { silent: true });
        this.attr(keys.footerGroupOffset, footerOffset, { silent: true });

        const totalHeight = this.get('headerHeight') + this.get('contentHeight') + this.get('footerHeight');

        this.prop({
            size: {
                width: SHAPE_WIDTH,
                height: totalHeight
            }
        });


    };

    onChangeOptions() {
        //const options = this.get('options');
    }

    autoresize() {
        // const content = joint.util.breakText(this.get('content'), {
        //     width: SHAPE_WIDTH
        // });
        //
        // const height = measureText(
        //     content,
        //     this.attr('.shape-content/fontSize'),
        //     this.attr('.shape-content/lineHeight'),
        // );
        //
        // const nextHeight = (Math.trunc(((height + PAGE_GRID_SIZE) / PAGE_GRID_SIZE)) + 1) * PAGE_GRID_SIZE;
        //
        // this.prop({
        //     attrs: {'.shape-content': {text: content}},
        //     size: {width: SHAPE_WIDTH + PAGE_GRID_SIZE, height: nextHeight}
        // });
    };

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}
