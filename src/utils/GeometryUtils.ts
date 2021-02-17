import * as joint from 'rappid';
import {PathParams} from '@interfaces/Types';
import _ from 'lodash';
import {PaperSettings} from '@constants/FlowchartConstants';
import {PartSizeConfig} from '@interfaces/ShapeConfig.interface';
import {DimensionShapeType} from '@interfaces/Shape.interface';
import {DefaultProps} from '@constants/ShapeConstants';
import {shapeStyle} from '@constants/StyleConstants';

export default class GeometryUtils {

    /** координатная четверть стандартная */
    static pointInQuarterNormalized(point: joint.g.Point): number {
        if (point.x > 0 && point.y > 0) {
            return 1;
        } else if (point.x > 0 && point.y < 0) {
            return 2;
        } else if (point.x < 0 && point.y > 0) {
            return 3;
        } else if (point.x < 0 && point.y > 0) {
            return 4;
        }

        if (point.x === 0 && point.y < 0) {
            return 23;
        } else if (point.x === 0 && point.y > 0) {
            return 14;
        } else if (point.x < 0 && point.y === 0) {
            return 43;
        } else if (point.x > 0 && point.y === 0) {
            return 12;
        }

        /** Считаем, что 0,0 - это -1 */
        return -1;
    }

    /**
     * @deprecated
     * @param point
     */
    static pointInQuarter(point: joint.g.Point): number {
        if (point.x > 0 && point.y < 0) {
            return 1;
        } else if (point.x > 0 && point.y > 0) {
            return 2;
        } else if (point.x < 0 && point.y > 0) {
            return 3;
        } else if (point.x < 0 && point.y < 0) {
            return 4;
        }

        if (point.x === 0 && point.y < 0) {
            return 34;
        } else if (point.x === 0 && point.y > 0) {
            return 12;
        } else if (point.x < 0 && point.y === 0) {
            return 23;
        } else if (point.x > 0 && point.y === 0) {
            return 14;
        }

        /** Считаем, что 0,0 - это -1 */
        return -1;
    }

    static makePath(options: PathParams) {
        const {
            PathX,
            PathY,
            Width,
            Height,
            Radius
        } = options;

        const {
            TR,
            BR,
            BL,
            TL
        } = Radius;

        const data = [];

        // start point in top-middle of the rectangle
        data.push('M' + (PathX + Width / 2) + ',' + PathY);

        // next we go to the right
        data.push('H' + (PathX + Width - TR));

        if (TR > 0) {
            // now we draw the arc in the top-right corner
            data.push('A' + GeometryUtils.arcParameter(TR, TR, 0, 0, 1, (PathX + Width), (PathY + TR)));
        }

        // next we go down
        data.push('V' + (PathY + Height - BR));

        if (BR > 0) {
            // now we draw the arc in the lower-right corner
            data.push('A' + GeometryUtils.arcParameter(BR, BR, 0, 0, 1, (PathX + Width - BR), (PathY + Height)));
        }

        // now we go to the left
        data.push('H' + (PathX + BL));

        if (BL > 0) {
            // now we draw the arc in the lower-left corner
            data.push('A' + GeometryUtils.arcParameter(BL, BL, 0, 0, 1, PathX, (PathY + Height - BL)));
        }

        // next we go up
        data.push('V' + (PathY + TL));

        if (TL > 0) {
            // now we draw the arc in the top-left corner
            data.push('A' + GeometryUtils.arcParameter(TL, TL, 0, 0, 1, (PathX + TL), PathY));
        }

        // and we close the path
        data.push('Z');

        return data.join(' ');
    }

    private static arcParameter(
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: number,
        sweepFlag: number,
        x: number,
        y: number
    ) {
        return [rx, ',', ry, ' ',
            xAxisRotation, ' ',
            largeArcFlag, ',',
            sweepFlag, ' ',
            x, ',', y].join('');
    };

    static measureText(text: string, attrFontSize: string, attrFontLine: string) {

        const fontSize = parseInt(attrFontSize, 10) || 10;
        const lineHeight = parseInt(attrFontLine, 10) || 10;

        const svgDocument = joint.V('svg').node;
        const textElement = joint.V('<text font-size="' + attrFontSize + '"><tspan></tspan></text>').node;
        const textSpan = textElement.firstChild! as SVGTextContentElement;
        const textNode = document.createTextNode('');

        textSpan.appendChild(textNode);
        svgDocument.appendChild(textElement);
        document.body.appendChild(svgDocument);

        const lines = text.split('\n');
        let width = 0;

        // Find the longest line width.
        lines.forEach((line: any) => {

            textNode.data = line;
            const lineWidth = textSpan.getComputedTextLength();

            width = Math.max(width, lineWidth);
        });

        const height = Math.round(lines.length * (fontSize * (lineHeight / fontSize)));

        joint.V(svgDocument).remove();

        return {width: width, height: height};
    }


    /**
     * Получаем контент и его высоту
     */
    static formatText(
        text: string,
        attrFontSize: string,
        attrFontLine: string,
        width: number,
        heights: { maxHeight: number; minHeight: number },
        flags: {
            splitBySign?: boolean
            roundHeight?: boolean
        } = {}
    ) {
        const {splitBySign, roundHeight} = flags;
        const fontSize = parseInt(attrFontSize, 10) || 16;
        const lineHeight = parseInt(attrFontLine, 10) || 16;
        const isStretchable = heights.minHeight !== heights.maxHeight;
        const {marginX, marginY} = DefaultProps.Rectangle;

        let textHeight = isStretchable ? heights.maxHeight - marginY * 2 : lineHeight;

        // из-за округления, добавим 1 пиксель чтобы влез текст
        const breakText = joint.util.breakText(text, {
            width: width - marginX * 2,
            height: textHeight + 1
        }, {
            'font-size': fontSize,
            'font-family': shapeStyle.TEXT_FONT_FAMILY,
            'line-height': lineHeight
        }, {ellipsis: true, separator: splitBySign ? '&nbsp;' : ' '});

        const measureText = GeometryUtils.measureText(breakText, attrFontSize, attrFontLine);


        /**
         * Если полученная высота меньше минимальной, то используем минимальную высоту.
         * Если больше максимальной - максимальную
         */
        let contentHeight = measureText.height + marginY * 2;

        if (contentHeight < heights.minHeight) {
            contentHeight = heights.minHeight;
        } else {
            // Округление до половины клетки
            if (roundHeight) {
                contentHeight = Math.round(contentHeight / PaperSettings.GRID_SIZE) * PaperSettings.GRID_SIZE;
            }

            if (contentHeight > heights.maxHeight) {
                contentHeight = heights.maxHeight
            }
        }

        return {
            contentHeight: Math.round(contentHeight),
            contentWidth: Math.round(measureText.width),
            content: breakText
        }
    }

    static getMaxHeight(size: PartSizeConfig, assemblyData: any) {
        const stretchable = _.get(size.stretch, 'stretchable', false);
        const stretchHeight = _.get(size.stretch, 'maxHeight', 0);
        let minHeight = size.height,
            maxHeight = stretchable ? Math.max(stretchHeight, size.height) : minHeight;
        if (assemblyData.dimensionType === DimensionShapeType.SQUARE) {
            minHeight = minHeight * PaperSettings.GRID_SIZE;
            maxHeight = maxHeight * PaperSettings.GRID_SIZE;
        }
        return {
            minHeight,
            maxHeight
        };
    }
}
