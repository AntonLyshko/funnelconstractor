import React from 'react';
import {inject, observer} from 'mobx-react';
import {useClassName} from '@hooks';
import {default as IStores} from '@stores/interface';
import {Button, Dropdown, message} from 'antd';

import './PaperTabs.scss';
import {MenuList} from '@ui';

type IProps = {
    stores?: IStores;
}

const PaperTabs = inject((stores: IStores) => stores)(
    observer((props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
            const {className} = props;
            const {cn, mergeClassName} = useClassName('paper-tabs');

            const menu = [
                {
                    text: '1 пункт',
                    callback: () => message.success('1 пункт')
                },
                {
                    text: '2 пункт',
                    callback: () => message.success('2 пункт')
                },
                {
                    text: '3 пункт',
                    callback: () => message.success('3 пункт')
                }
            ];
            return (
                <div className={mergeClassName(cn(), className)}>
                    <div className={cn('wrap')}>
                        <Dropdown overlay={<MenuList menu={menu}/>}>
                            <Button className={cn('button', {'is-active': true})}>
                                Основной
                            </Button>
                        </Dropdown>
                    </div>

                    <div className={cn('wrap')}>
                        <Dropdown overlay={<MenuList menu={menu}/>}>
                            <Button className={cn('button', {'is-active': false})}>
                                Дополнительный
                            </Button>
                        </Dropdown>
                    </div>

                    <div className={cn('wrap')}>
                        <Dropdown.Button className={cn('button-control', {'is-active': false})}
                                         overlay={<MenuList menu={menu}/>}>
                            Еще
                        </Dropdown.Button>
                    </div>
                </div>
            );
        }
    )
)

export default PaperTabs;