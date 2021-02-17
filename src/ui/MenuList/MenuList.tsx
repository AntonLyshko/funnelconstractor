import React from 'react';
import {useClassName} from '@hooks';
import {Menu} from 'antd';

import './MenuList.scss';

type IProps = {
    onCloseMenu?: () => void;
    menu: {
        text: string;
        callback?: () => void
    }[]
}

const MenuList = (props: IProps) => {
    const {menu, onCloseMenu} = props;
    const {cn} = useClassName('menu-list');

    return (
        <Menu className={cn()} selectable={false}>
            {
                menu.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            className={cn('item')}
                            onClick={() => {
                                item.callback && item.callback();
                                onCloseMenu && onCloseMenu();
                            }}
                        >
                            {item.text}
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    );
};

export default MenuList;