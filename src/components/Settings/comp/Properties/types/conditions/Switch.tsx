import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, } from '@stores/interface'
import General from '../General'
import SwitchRouter from '../../components/Condition/SwitchRouter'


type TProps = {

}

const Condition = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {


        return (
            <div className='props-item'>
                <General />
                <SwitchRouter />
            </div >
        )
    })
)

export default Condition;