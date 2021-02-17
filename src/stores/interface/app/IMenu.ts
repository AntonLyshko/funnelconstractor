import { IMenuAccordion, ISidebar } from '@stores/interface';
import { TMenuCategory } from '@interfaces/ShapeConfig.interface';

export default interface IMenu extends ISidebar {
    accordion: IMenuAccordion;
    items: any;
    canDrag: boolean;
    categories: TMenuCategory[];
    active: () => void;
    disable: () => void;
    save: (config: any) => IMenu;
    closeAndClear: () => void;
    init: () => void;
    getIndexes: (category: string, item: string) => number[];
}