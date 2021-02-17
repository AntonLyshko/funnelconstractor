import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IChatStore } from '@stores/interface'


type TProps = {
    chatStore?: IChatStore
}

const ChatContent = inject((stores: IStores) => ({
    chatStore: stores.chatStore
}))(
    observer((props: TProps) => {
        const { chatStore } = props;
        const chatHistory = chatStore.getHistory

        if (chatHistory.length) {
            return (
                <div className='chat-content'>
                    {
                        chatHistory.map(item => {
                            switch (item.type) {
                                case 'send':
                                    return (
                                        <div key={item.id} className="chat-bot-msg">
                                            <div key={item.id} className="chat-bot-content">{item.msg ? item.msg : 'Отправка сообщения'}</div>
                                        </div>
                                    )
                                case 'input':
                                    return (
                                        <Fragment>
                                            { item.msg.length ? (
                                                <Fragment>
                                                    <div key={item.id} className="chat-input-msg">
                                                        <div className='chat-input-content'>{item.msg}</div>
                                                    </div>
                                                </Fragment>
                                            ) : (<Fragment></Fragment>)}
                                        </Fragment>
                                    )
                                default:
                                    return null
                            }
                        })
                    }

                </div>
            )
        } else {
            return null
        }
    })
)

export default ChatContent;