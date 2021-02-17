import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, } from '@stores/interface'
import General from '../General'
import SetVariable from '../../components/Variables/SetVariable'

type TProps = {

}

const VariableSetting = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {


        return (
            <div className='props-item'>
                <General editable={true} />
                <SetVariable />
            </div >
        )
    })
)

export default VariableSetting;