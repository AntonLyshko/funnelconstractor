import { element } from './AppShapes';
import _BaseElementModel from './element/_BaseElementModel';
import { dia } from 'rappid';
import Cell = dia.Cell;

export default class ElementProducer {
    static produceCell<T extends Cell>(cell: T): _BaseElementModel {
        const options = cell.attributes.shape;
        if (element[options.type]) {
            let newCell = new element[options.type](options)
            return newCell;
        }
        return new element.start(options);
    }

    static reCreateCell(shape: any): _BaseElementModel {
        if (element[shape.type]) {
            let newCell = new element[shape.type](shape)
            return newCell;
        }
        return new element.start(shape);
    }
}