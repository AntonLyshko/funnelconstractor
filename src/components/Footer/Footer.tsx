import React from 'react';
import {inject, observer} from 'mobx-react';
import {useClassName} from '@hooks';
import {default as IStores} from '@stores/interface';
import PaperTabs from '@components/Footer/PaperTabs/PaperTabs';

import GraphGenerator from '@components/Footer/GraphGenerator/GraphGenerator';
import './Footer.scss';

type IProps = {
    stores?: IStores;
}

const Footer = inject((stores: IStores) => stores)(
    observer((props: IProps) => {
        const {} = props;
        const {cn} = useClassName('footer')
            return (
                <div className={cn()}>
                    <PaperTabs/>
                    <GraphGenerator/>
                </div>
            );
        }
    )
)

export default Footer;