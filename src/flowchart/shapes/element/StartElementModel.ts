import * as joint from 'rappid';

import _BaseElementModel, { STYLE_PARAMS, MARKUP, PORT_MARKUP } from './_BaseElementModel';

export default class StartElementModel extends _BaseElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            variables: [],
            ports: {
                items: [{
                    id: 'start-out-port',
                    group: 'out'
                }],
                groups: {
                    out: PORT_MARKUP.ports.groups.out
                }
            },
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}