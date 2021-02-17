import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import General from '../General'
import SetIncome from '../../components/SetIncome';
import ReceiveMsg from '../../components/Listen/ReceiveMsg';
import Channel from '../../components/Channel'



type TProps = {

}


const InputMsg = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        const [activePanel, setActivePanel] = useState('')

        return (
            <div className="props-item">
                <General />
                <ReceiveMsg />
                <SetIncome activePanel={activePanel} setActivePanel={setActivePanel} />
                <Channel activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>

        );
    })
)

export default InputMsg;