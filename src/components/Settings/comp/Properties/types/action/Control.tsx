import React, { } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import General from '../General'
import ControlPort from '../../components/ControlPort'

type TProps = {

}


const Control = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        return (
            <div className="props-item">
                <General />
                <ControlPort />
            </div>

        );
    })
)

export default Control;