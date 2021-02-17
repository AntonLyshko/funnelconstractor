import * as joint from 'rappid';

import {PORT_MARKUP} from './_BaseElementModel';
import _UniversalElementModel, {STYLE_PARAMS, MARKUP} from '@flowchart/shapes/element/_UniversalElementModel';

export default class ProcessElementModel extends _UniversalElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            ports: {
                items: [{
                    id: 'universal-out-port',
                    group: 'out'
                },
                    {
                        id: 'universal-in-port',
                        group: 'in'
                    },
                    {
                        id: 'positive-port-1',
                        group: 'positive',
                        args: {y: 65}
                    },
                    {
                        id: 'positive-port-2',
                        group: 'positive',
                        args: {y: 95}
                    },
                    {
                        id: 'positive-port-3',
                        group: 'positive',
                        args: {y: 125}
                    }
                ],
                groups: {
                    out: PORT_MARKUP.ports.groups.out,
                    in: PORT_MARKUP.ports.groups.in,
                    positive: PORT_MARKUP.ports.groups.positive,
                }
            }
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}