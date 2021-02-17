import { action, observable } from 'mobx';

import { ISidebar } from '@stores/interface';

export default class CSidebar implements ISidebar {
    @observable isOpen: boolean = false;

    constructor(isOpenDefault: boolean) {
        this.isOpen = false;
    }

    @action.bound
    open() {
        this.isOpen = true;
    }

    @action.bound
    close() {
        this.isOpen = false;
    }

    @action.bound
    toggle() {
        this.isOpen = !this.isOpen;
    }
}
