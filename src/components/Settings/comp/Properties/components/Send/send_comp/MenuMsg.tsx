import React, {useState} from 'react';
import {Icon} from '@ui';
import {Button} from 'antd';

type TProps = {
	addMsg?: (type: string, index: number) => void,
	index?: number
}
const MenuVariables = (props: TProps) => {
	const {addMsg, index} = props;
	const [isOpen, setOpen] = useState(false);
	
	const middleWare = (type: string, index: number) => {
		setOpen(false);
		addMsg(type, index);
	};
	
	return (
		
		<div className="add-msg-container">
			<div className='add-trigger-container'>
				<Button onClick={() => setOpen(!isOpen)} className='add-variable-trigger no-margin'>
					+
				</Button>
			</div>
			{
				isOpen && (
					<div className="add-msg-item-content">
						<div onClick={() => middleWare('text', index)} className="add-msg-item">
							<Icon name={'solid_align-left'}/>
						</div>
						<div onClick={() => middleWare('img', index)} className="add-msg-item">
							<Icon name={'solid_image'}/>
						</div>
						<div onClick={() => middleWare('file', index)} className="add-msg-item">
							<Icon name={'solid_file'}/>
						</div>
						{/*<div onClick={() => middleWare('video', index)} className="add-msg-item">*/}
						{/*	<Icon name={'solid_video'}/>*/}
						{/*</div>*/}
						{/*<div onClick={() => middleWare('audio', index)} className="add-msg-item">*/}
						{/*    <Icon name={'solid_microphone-alt'} />*/}
						{/*</div>*/}
					</div>
				)
			}
		</div>
	
	
	);
	
};


export default MenuVariables;
