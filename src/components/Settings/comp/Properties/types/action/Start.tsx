import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import InitVariables from '../../components/Variables/InitVariables'
import General from '../General'

type TProps = {

}

const Start = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        return (
            <div className="props-item">
                <General />
                <InitVariables />
            </div>

        );
    })
)

export default Start;