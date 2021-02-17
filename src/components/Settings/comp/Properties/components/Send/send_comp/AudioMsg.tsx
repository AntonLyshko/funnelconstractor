import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore, IFlowchartStore } from '@stores/interface'
import ControlMsg from './ControlMsg'
import { Icon } from '@ui'

type TProps = {
    index?: number,
    addMsg?: (type: string, index: number) => void,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
    flowchartStore?: IFlowchartStore,
}
const AudioMsg = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore, index, addMsg } = props;
        const step = scriptStore.activeStep
        const [reRender, activeReRender] = useState(false);

        const handleMove = (index: number, dir: boolean) => {
            if (dir) {
                if (index !== 0) {
                    step.movePayloadItem('msg', index, index - 1)
                    flowchartStore.changeContent(step.payload['msg'][0])
                }
            } else {
                if (index !== step.payload['msg'].length - 1) {
                    step.movePayloadItem('msg', index, index + 1)
                    flowchartStore.changeContent(step.payload['msg'][0])
                }
            }
            //just for re-render
            activeReRender(!reRender)
        }

        const removeMsg = (index: number) => {
            step.removePayload('msg', index)
            flowchartStore.changeContent(step.payload['msg'][0])
            //just for re-render
            activeReRender(!reRender)
        }

        return (
            <div key={Math.random()} className="msg-item">
                <div className="msg-file-content">
                    <div className="content-icon">
                        <Icon name={'solid_microphone-alt'} />
                    </div>
                    <div className="content-name">
                        {step.payload.msg[index].fileName}
                    </div>
                </div>
                <ControlMsg index={index} handleMove={handleMove} removeMsg={removeMsg} addMsg={addMsg} />
            </div>

        )

    })
)

export default AudioMsg;