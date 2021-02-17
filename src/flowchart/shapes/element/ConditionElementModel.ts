import * as joint from 'rappid';

import _BaseElementModel, {STYLE_PARAMS, MARKUP, PORT_MARKUP} from './_BaseElementModel';

export default class ConditionElementModel extends _BaseElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            ports: {
                items: [{
                    id: 'condition-in-port',
                    group: 'in'
                }, {
                    id: 'condition-negative-port',
                    group: 'negative'
                },
                    {
                        id: 'condition-positive-port',
                        group: 'positive'
                    }
                ],
                groups: {
                    positive: PORT_MARKUP.ports.groups.positive,
                    negative: PORT_MARKUP.ports.groups.negative,
                    in: PORT_MARKUP.ports.groups.in
                }
            }
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}