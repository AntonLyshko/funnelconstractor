import React from 'react';
import Menu from '@components/Menu/Menu';
import { Brand } from '@ui';
import { inject, observer } from "mobx-react";
import IStores, { IMenu } from "@stores/interface";
import './SidebarLeftLayout.scss';
import { useClassName } from '@hooks';
import ModeSelect from '../../components/Header/ModeSelect/ModeSelect'
import SaveAndUpload from '../../components/Header/SaveAndUpload/SaveAndUpload'
import SettingsToggle from '../../components/Header/SettingsToggle/SettingsToggle'

type TProps = {
    menu?: IMenu
}

const SidebarLeftLayout = inject((stores: IStores) => ({ menu: stores.appStore.menu }))
    (observer((props: TProps) => {

        const { cn } = useClassName('left-sidebar-layout');
        const { menu } = props;

        // const toggle = () => {
        //     if (menu.isOpen) {
        //         menu.accordion.removeActive();
        //     }
        //     menu.toggle();
        // }

        return (
            <div className="sider-left">
                <div className="header">
                    <div className="right-side-header">
                        <Brand className={cn('brand')} isPreview={!menu.isOpen} />
                        <ModeSelect />
                    </div>

                    <div className="left-side-header">
                        <SaveAndUpload />
                        <SettingsToggle />
                    </div>
                </div>
                <Menu />
            </div>
        );
    })
    );

export default SidebarLeftLayout;
