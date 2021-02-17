import React, { useState, Fragment } from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { default as IStores, IChatStore, IScriptStore } from '@stores/interface'
import ScriptModel from '@script/ScriptModel';
import { Input } from 'antd';

type TProps = {
    scriptStore?: IScriptStore,
    chatStore?: IChatStore
}

const ChatInput = inject((stores: IStores) => ({
    chatStore: stores.chatStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { chatStore, scriptStore } = props;
        const [message, setMessage] = useState('')
        const chatHistory = chatStore.getHistory
        const scriptModel = new ScriptModel();


        const currentChatStep = chatHistory[chatHistory.length - 1]

        const onSend = () => {
            if (chatHistory[chatHistory.length - 1].type === 'input') {
                let step = scriptStore.getStep(currentChatStep.step_id)
                step.setPayload('input', message);
                scriptModel.nextStep([step.step_id])
            }
            setMessage('')
        }

        const onChange = (value: string) => {
            setMessage(value)
        }


        const chatStatus = () => {
            if (chatHistory.length) {
                switch (currentChatStep.type) {
                    case 'send':
                        return (<div className='chat-status-content'>Бот отправил вам сообщение</div>)
                    case 'input':
                        return (<div className='chat-status-content'>Бот ждет вашего сообщения</div>)
                    default:
                        break;
                }
            }
            return null
        }



        return (
            <Fragment>
                <div className='chat-status-container'>
                    {
                        chatStatus()
                    }
                </div>
                <div className='send-input'>
                    <Input className='variable-input' type="text" placeholder='Написать сообщение...' value={message} onChange={(e) => onChange(e.target.value)} />
                    <Button onClick={onSend} type="primary">Отправить</Button>
                </div>
            </Fragment>
        )
    })
)



export default ChatInput;