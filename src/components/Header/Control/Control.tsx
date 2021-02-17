import React, { useState } from 'react';
import { useClassName } from '@hooks';
import { Dropdown, message } from 'antd';
import { Icon, MenuList } from '@ui';

import './Control.scss';

type IProps = {}

const Control = (props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
    const { className } = props;
    const [visible, setVisible] = useState(false);
    const { cn, mergeClassName } = useClassName('control');

    const build = () => {
        message.info('Обработка клика по кнопке "Запуск"');
    }

    const menu = [
        {
            text: '1 пункт меню',
            callback: () => message.success('1 пункт меню')
        },
        {
            text: '2 пункт меню наведение',
            callback: () => message.success('2 пункт меню наведение')
        },
        {
            text: '3 пункт меню нажатие',
            callback: () => message.success('3 пункт меню нажатие')
        }
    ];

    return (
        <div className={mergeClassName(cn(), className)}>
            <Dropdown.Button
                visible={visible}
                onVisibleChange={setVisible}
                className={cn('button')}
                type={'primary'}
                onClick={build}
                overlay={<MenuList menu={menu} onCloseMenu={() => setVisible(false)} />}
                size={'large'}
                icon={<Icon name={'solid_chevron-down'} />}
            >
                <Icon className={cn('icon-power')} name={'solid_play'} /><span>Запуск</span>
            </Dropdown.Button>
        </div>
    );
};

export default Control;