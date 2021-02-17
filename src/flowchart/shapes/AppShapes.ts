import * as joint from 'rappid';
import _ from 'lodash';
import { MenuItemModel } from './menu/MenuItemModel';
import StartElementModel from './element/StartElementModel';
import EndElementModel from "./element/EndElementModel";
import ProcessElementModel from "./element/ProcessElementModel";
import ConditionElementModel from "./element/ConditionElementModel";
import ChoiceElementModel from "./element/ChoiceElementModel";
import CommonElementModel from '@flowchart/shapes/element/CommonElementModel';
import RectangleShape from '@flowchart/shapes/element/RectangleShape';
import * as Shape from '@constants/ShapeConstants';
import { OptionListShapeConfig } from '@interfaces/ShapeConfig.interface';
import CircleShape from '@flowchart/shapes/element/CircleShape';
import { shapeStyle } from '@constants/StyleConstants';

export namespace menu {
    export class item extends MenuItemModel {
    }
}

export namespace element {

    export class start extends StartElementModel {
    }

    export class end extends EndElementModel {
    }

    export class process extends ProcessElementModel {
    }

    export class condition extends ConditionElementModel {
    }

    export class choice extends ChoiceElementModel {
    }

    export class common extends CommonElementModel {
    }

    export class rectangle extends RectangleShape {
    }

    export class circle extends CircleShape {
    }
}


export namespace app {
    export class Link extends joint.shapes.standard.Link {
        defaults() {
            return joint.util.defaultsDeep({
                type: 'app.Link',
                z: 0,
                connector: {
                    name: 'smooth'
                },
                labels: [],
                attrs: {
                    wrapper: {
                        strokeWidth: 15,
                        stroke: '#fff',
                        'stroke-opacity': 0
                    },
                    line: {
                        stroke: '#3498DB',
                        strokeDasharray: '0',
                        strokeWidth: 3,
                        fill: 'none',
                        sourceMarker: {
                            type: 'path',
                            d: 'M 0 0 0 0',
                            stroke: 'none'
                        },
                        targetMarker: {
                            opacity: 1,
                            type: 'path',
                            d: 'M 0 -5 -10 0 0 5 z',
                            stroke: 'none'
                        }
                    }
                }
            }, joint.shapes.standard.Link.prototype.defaults);
        }

        static connectionPoint(line: any, view: any, magnet: any, opt: any, type: any, linkView: any): joint.connectionPoints.GenericConnectionPoint<'boundary'> {

            return joint.connectionPoints.anchor.call(this, line, view, magnet, opt, type, linkView);

        }
    }
}

export class LinkView extends joint.dia.LinkView {
    renderMarkup() {
        super.renderMarkup();
    }
}

export class ElementView extends joint.dia.ElementView {


    renderMarkup() {
        if (this.model['rendered'] == undefined) {
            super.renderMarkup()
            this.model['rendered'] = true;
        }

        const optionList: OptionListShapeConfig | void = this.model.get('options');

        // A holder for all the options.
        const $options = this.$(Shape.Selector.options)[0];

        if ($options) {
            if ($options.lastElementChild) {
                while ($options.lastElementChild) {
                    $options.removeChild($options.lastElementChild);
                }
            }
        }


        if (!optionList || !optionList.items || _.isEmpty(optionList.items)) {
            return;
        }


        // Create an SVG element representing one option. This element will
        // be cloned in order to create more options.
        const elOption = joint.V(Shape.optionMarkup);
        optionList.items.forEach((option, index) => {
            const optionSelector = Shape.Selector.removeDot(Shape.Selector.option) + `-${index}`;
            const textSelector = Shape.Selector.removeDot(Shape.Selector.optionText) + `-${index}`;
            const backgroundSelector = Shape.Selector.removeDot(Shape.Selector.optionBackground) + `-${index}`;
            let parent: joint.Vectorizer = elOption.clone().addClass(optionSelector);
            parent.findOne(Shape.Selector.optionText).addClass(textSelector);
            parent.findOne(Shape.Selector.optionBackground).addClass(backgroundSelector);
            parent.attr('option-id', index);
            $options.append(parent.node);
        })
    }
}

export const NavigatorElementView = joint.dia.ElementView.extend({

    body: null,

    markup: [{
        tagName: 'rect',
        selector: 'body',
        attributes: {
            'fill': '#31d0c6'
        }
    }],

    presentationAttributes: {
        position: ['TRANSLATE'],
        size: ['RESIZE'],
        angle: ['ROTATE']
    },

    render: function () {
        const { fragment, selectors: { body } } = joint.util.parseDOMJSON(this.markup);
        this.body = body;

        this.el.appendChild(fragment);
        this.updateNodesAttributes();
        this.updateTransformation();
    },

    updateNodesAttributes: function () {
        const { width, height } = this.model.get('size');
        const subclass = this.model.get('class');
        this.body.setAttribute('width', width);
        this.body.setAttribute('fill', shapeStyle.ICON_TYPE_BACKGROUND[subclass]);
        this.body.setAttribute('height', height);
    }
});

export const NavigatorLinkView = joint.dia.LinkView.extend({

    initialize: joint.util.noop,

    render: joint.util.noop,

    update: joint.util.noop
});

export const basic = joint.shapes.basic;
export const standard = joint.shapes.standard;
export const fsa = joint.shapes.fsa;
export const pn = joint.shapes.pn;
export const erd = joint.shapes.erd;
export const uml = joint.shapes.uml;
export const org = joint.shapes.org;

