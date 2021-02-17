import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IChatStore } from '@stores/interface'
import ScriptModel from '@script/ScriptModel';


type TProps = {
    scriptStore?: IScriptStore,
    chatStore?: IChatStore
}

const ChatControl = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    chatStore: stores.chatStore
}))(
    observer((props: TProps) => {
        const { scriptStore, chatStore } = props
        const script = scriptStore.getScript;
        let startIndex = script.findIndex(step => step.view_name === 'Блок Старт');
        const scriptModel = new ScriptModel();

        const startChat = () => {
            chatStore.clearChat()
            scriptModel.startScript()
        }

        if (startIndex >= 0) {
            return (
                <div className='chat-play-trigger' onClick={() => startChat()}>
                    Play
                </div>
            )
        }
        return (
            <div className='announcement'>
                Запускать нечего
            </div>
        )

    })
)

export default ChatControl;

