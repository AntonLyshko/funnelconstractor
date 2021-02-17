import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, } from '@stores/interface'
import General from '../General'
import TimerComponent from '../../components/Condition/Timer'

type TProps = {

}

const Pause = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        return (
            <div className='props-item'>
                <General />
                <TimerComponent />
            </div >
        )
    })
)

export default Pause;