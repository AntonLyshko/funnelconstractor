import { action, observable, computed } from 'mobx';
import CSidebar from "@stores/implementation/app/CSidebar";
import ISettings from "@stores/interface/app/ISettings";
import $ from 'jquery'

export default class CSettings extends CSidebar implements ISettings {
    @observable tab: string = 'chat';
    @observable mobileMenu: boolean = false;

    @action
    toggleMobileMenu() {
        this.mobileMenu = !this.mobileMenu;
        $('.sider-left').toggleClass('active')
        $('.menu').toggleClass('active')
    }
    @action
    openMobileMenu() {
        this.mobileMenu = true;
        $('.sider-left').addClass('active')
        $('.menu').addClass('active')
    }
    @action
    closeMobileMenu() {
        this.mobileMenu = false;
        $('.sider-left').removeClass('active')
        $('.menu').removeClass('active')
    }

    @action
    openChat() {
        this.tab = 'chat';
        this.open();
    }

    @action
    openSettings() {
        this.tab = 'settings';
        this.open();
    };

    @action
    closeSettings() {
        this.tab = 'settings';
        this.close();
    };

    @computed
    get activeTab() {
        return this.tab
    }

}
