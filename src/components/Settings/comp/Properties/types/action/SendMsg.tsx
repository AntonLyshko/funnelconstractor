

import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore, IFlowchartStore } from '@stores/interface'
import General from '../General'
import Channel from '../../components/Channel'
import SendInput from '../../components/Send/SendInput'


type TProps = {
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
    flowchartStore?: IFlowchartStore,
}
const SendMsg = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {
        const [activePanel, setActivePanel] = useState('')

        return (
            <div className="props-item">
                <General />
                <SendInput />
                <Channel activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
        )

    })
)

export default SendMsg;