import * as joint from 'rappid';

import _BaseElementModel, {STYLE_PARAMS, MARKUP, PORT_MARKUP} from './_BaseElementModel';

export default class ChoiceElementModel extends _BaseElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            ports: {
                items: [{
                    id: 'switch-in-port',
                    group: 'in'
                }, {
                    id: 'switch-negative-port',
                    group: 'negative'
                },
                    {
                        id: 'switch-positive-port1',
                        group: 'positive'
                    },
                    {
                        id: 'switch-positive-port2',
                        group: 'positive'
                    },
                    {
                        id: 'switch-positive-port3',
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