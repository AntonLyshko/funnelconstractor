import React from 'react';
import {Icon} from '@ui';
import './Chat.scss';


// import ChatControl from './comp/ChatControl'
// import ChatContent from './comp/ChatContent'
// import ChatInput from './comp/ChatInput'

const Chat = () => {
	return (
		<div className="settings-content">
			{/* <ChatControl />
			 <ChatContent />
			 <ChatInput /> */}
			
			{/*<div className="announcement">*/}
			{/*	Чат находится в разработке*/}
			{/*</div>*/}
			
			<p className='chat-test-title'>Ссылки на тестовые чаты: </p>
			<div className="chat-test-item">
				<Icon name='social_media_telegram' className='icon-l'/>
				<br/> <a href="#">@TelegramTestBot2131</a>
			</div>
			<div className="chat-test-item">
				<Icon name={'social_media_vkontakte'} className='icon-l'/>
				<br/> <a href="#">https://vk.com/messages/testbot2131</a>
			</div>
			<div className="chat-test-item">
				<Icon name={'social_media_odnoklassniki'} className='icon-l'/>
				<br/> <a href="#">https://ok.com/messages/testbot2131</a>
			</div>
		</div>
	
	);
};


export default Chat;
