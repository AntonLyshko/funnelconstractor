import React from 'react';
import { inject, observer } from 'mobx-react';
import { useClassName } from '@hooks';
import { default as IStores, ISettings } from '@stores/interface';

import './Header.scss';



//import Control from '@components/Header/Control/Control';

type IProps = {
    settings?: ISettings;
}

const Header = inject((stores: IStores) => ({ settings: stores.appStore.settings }))(
    observer((props: IProps) => {
        const { cn } = useClassName('header')
        return (
            <div className={cn()}>

            </div>
        );
    }
    )
)

export default Header;