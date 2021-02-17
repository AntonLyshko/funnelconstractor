import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, } from '@stores/interface'
import General from '../General'
import AlarmComponent from '../../components/Condition/Alarm'

type TProps = {

}

const Alarm = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {


        return (
            <div className='props-item'>
                <General />
                <AlarmComponent />
            </div >
        )
    })
)

export default Alarm;