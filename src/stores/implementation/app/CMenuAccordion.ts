import { action, observable } from 'mobx';
import { IMenuAccordion } from '@stores/interface';
import $ from 'jquery'


export default class CMenuAccordion implements IMenuAccordion {
    @observable active: string;
    @observable hover: string;

    @action.bound
    removeActive(): void {
        this.active = '';
    }

    @action.bound
    removeHover(): void {
        this.hover = '';
        document.querySelectorAll(`[data-category] g[data-category-item] .stencil-menu-body`).forEach(item => {
            item.setAttribute('data-hover', 'false');
        })
    }

    @action.bound
    setActive(category: string, name?: string): void {
        if (this.active === category) {
            this.active = '';
        } else {
            this.active = category;
        }
    }

    @action.bound
    setHover(category: string, name?: string): void {
        this.hover = category;
        if (name) {
            // Костыль
            if (name.includes(" ")) {
                name = name.split(' ').join('\n');
            }
            $(`g[data-category-item="${name}"] .stencil-menu-body`).attr('data-hover', 'true');
        }
    }

    isActive(category: string) {
        return this.active === category;
    }

    isHover(category: string) {
        return this.hover === category;
    }
}
