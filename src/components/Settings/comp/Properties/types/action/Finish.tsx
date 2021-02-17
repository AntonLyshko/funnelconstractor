import React, { } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import General from '../General'


type TProps = {

}


const Finish = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        return (
            <div className="props-item">
                <General />
            </div>

        );
    })
)

export default Finish;