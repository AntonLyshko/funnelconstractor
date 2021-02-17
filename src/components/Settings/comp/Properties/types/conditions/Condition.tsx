import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, } from '@stores/interface'
import General from '../General'
import Comparator from '../../components/Condition/Comparator'

type TProps = {

}

const Condition = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {


        return (
            <div className='props-item'>
                <General />
                <Comparator />
            </div >
        )
    })
)

export default Condition;