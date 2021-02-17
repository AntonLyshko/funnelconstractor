import * as joint from 'rappid';

import _BaseElementModel, {MARKUP, PORT_MARKUP, STYLE_PARAMS} from './_BaseElementModel';

export default class EndElementModel extends _BaseElementModel {

    defaults() {
        return joint.util.defaultsDeep({
            ...STYLE_PARAMS,
            ...MARKUP,
            ...PORT_MARKUP,
            ports: {
                items: [{
                    id: 'end-in-port',
                    group: 'in'
                }],
                groups: {
                    in: PORT_MARKUP.ports.groups.in
                }
            }
        }, joint.shapes.standard.Rectangle.prototype.defaults);
    }
}