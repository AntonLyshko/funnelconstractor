import * as joint from "rappid";
import { SomeElement, SomeModel, SomeView } from '@interfaces/Markup.interface';

export enum StyleStates {
    HOVER = 'hover',
    ACTIVE = 'active',
    DEFAULT = 'default',
    CONTROL = 'control',
}

export class MarkupUtils {

    static isLine(element: SomeElement): boolean {
        return element instanceof joint.dia.Link || element instanceof joint.dia.LinkView;
    }

    static isShape(element: SomeElement): boolean {
        return element instanceof joint.dia.Element || element instanceof joint.dia.ElementView;
    }

    static isView(element: SomeElement): boolean {
        return element instanceof joint.dia.LinkView || element instanceof joint.dia.ElementView;
    }

    static isModel(element: SomeElement): boolean {
        return element instanceof joint.dia.Element || element instanceof joint.dia.Link;
    }

    static getModel(element: SomeElement): SomeModel | void {
        if (MarkupUtils.isModel(element)) {
            return element! as SomeModel;
        }
        if (MarkupUtils.isView(element)) {
            const view = element! as SomeView;
            return view.model;
        }
    }

    static addState(element: SomeElement, state: StyleStates): void {
        const model = MarkupUtils.getModel(element);
        model && model.set({ 'data-state': state });
    }



    static removeState(element: SomeElement): void {
        const model = MarkupUtils.getModel(element);
        model && model.set({ 'data-state': StyleStates.DEFAULT });
    }

    static hasState(element: SomeElement, state: StyleStates): boolean {
        const model = MarkupUtils.getModel(element);
        const modelState = model && model.get('data-state');
        if (!modelState) {
            return true;
        }
        return modelState === state;
    }

    static toggleState(element: SomeElement, state: StyleStates): void {
        if (MarkupUtils.hasState(element, state)) {
            MarkupUtils.removeState(element)
        } else {
            MarkupUtils.addState(element, state)
        }
    }
}