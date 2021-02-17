

import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore, IFlowchartStore } from '@stores/interface'
import MenuVariables from '../../Variables/variable_comp/MenuVariables'
import { Input, Popover, Button } from 'antd';
import ControlMsg from './ControlMsg'


type TProps = {
    index?: number,
    addMsg?: (type: string, index: number) => void,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
    flowchartStore?: IFlowchartStore,
}
const TextMsg = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore, index, addMsg } = props;
        const step = scriptStore.activeStep
        const [reRender, activeReRender] = useState(false);

        const onChange = (index: number, value: string) => {
            step.changePayload('msg', index, 'text', value)

            setTimeout(() => {
                flowchartStore.changeContent(step.payload['msg'][0])
            }, 100)

        }


        const handleMenuSelect = (selectedVariable: any) => {
            let msg;
            if (step.payload['msg'][index].text) {
                msg = '' + step.payload['msg'][index].text + '' + '{' + selectedVariable.name + '} '
            } else {
                msg = '{' + selectedVariable.name + '} '
            }
            step.changePayload('msg', index, 'text', msg)

            setTimeout(() => {
                flowchartStore.changeContent(step.payload['msg'][0])
            }, 100)
            //just for re-render
            activeReRender(!reRender)
        }

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


        const { TextArea } = Input;

        return (
            <div className="msg-item">
                <div className="msg-item-content">
                    <Popover placement="bottomRight" content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                        <div className='menu-trigger-container in-input'>
                            <Button className='variable-trigger in-input'>*</Button>
                        </div>
                    </Popover>
                    <TextArea className='send-input' placeholder='Ваше сообщение' value={step.payload.msg[index]['text']} onChange={(e) => onChange(index, e.target.value)} />
                </div>
                <ControlMsg index={index} handleMove={handleMove} removeMsg={removeMsg} addMsg={addMsg} />            </div>

        )

    })
)

export default TextMsg;