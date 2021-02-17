import * as joint from 'rappid';

import _BaseElementModel, {STYLE_PARAMS, MARKUP, PORT_MARKUP} from './_BaseElementModel';

export default class ProcessElementModel extends _BaseElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            ports: {
                items: [{
                    id: 'process-out-port',
                    group: 'out'
                },
                    {
                        id: 'process-in-port',
                        group: 'in'
                    }
                ],
                groups: {
                    out: PORT_MARKUP.ports.groups.out,
                    in: PORT_MARKUP.ports.groups.in
                }
            }
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}