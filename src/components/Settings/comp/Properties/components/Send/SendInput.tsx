import React, {useState, Fragment, useRef, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IVariableStore, IScriptStore, IFlowchartStore} from '@stores/interface';

import MenuMsg from './send_comp/MenuMsg';
import TextMsg from './send_comp/TextMsg';
import ImgMsg from './send_comp/ImgMsg';
import FileMsg from './send_comp/FileMsg';
// import AudioMsg from './send_comp/AudioMsg';
// import VideoMsg from './send_comp/VideoMsg';

type TProps = {
	scriptStore?: IScriptStore,
	variableStore?: IVariableStore,
	flowchartStore?: IFlowchartStore,
}
const SendInput = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	flowchartStore: stores.flowchartStore,
	variableStore: stores.variableStore,
}))(
	observer((props: TProps) => {
		const {scriptStore, flowchartStore} = props;
		const step = scriptStore.activeStep;
		
		const [activeMsg, setActiveMsg] = useState(0);
		const [reRender, activeReRender] = useState(false);
		
		const fileInputRef = useRef(null);
		const audioInputRef = useRef(null);
		const imgInputRef = useRef(null);
		
		
		useEffect(() => {
			if (!step.payload['msg']) {
				let data = {
					type: 'text',
					text: '',
				};
				step.addPayload('msg', data);
			}
		});
		
		
		const imgChange = (e: any) => {
			e.preventDefault();
			let reader = new FileReader();
			let file = e.target.files[0];
			
			reader.onloadend = () => {
				let data = {
					type: 'img',
					fileName: file.name,
					url: reader.result,
				};
				step.insertPayload('msg', activeMsg, data);
				flowchartStore.changeContent(step.payload['msg'][0]);
				activeReRender(!reRender);
			};
			reader.readAsDataURL(file);
			
		};
		
		const fileChange = (e: any) => {
			e.preventDefault();
			let reader = new FileReader();
			let file = e.target.files[0];
			reader.onloadend = () => {
				let data = {
					type: 'file',
					fileName: file.name,
					url: reader.result,
				};
				step.insertPayload('msg', activeMsg, data);
				flowchartStore.changeContent(step.payload['msg'][0]);
				activeReRender(!reRender);
			};
			reader.readAsDataURL(file);
		};
		
		
		// const audioChange = (e: any) => {
		//     e.preventDefault();
		//     let reader = new FileReader();
		//     let file = e.target.files[0];
		//     reader.onloadend = () => {
		//         let data = {
		//             type: 'audio',
		//             fileName: file.name,
		//             url: reader.result,
		//         }
		//         step.insertPayload('msg', activeMsg, data)
		//         flowchartStore.changeContent(step.payload['msg'][0])
		//         activeReRender(!reRender)
		//     }
		//     reader.readAsDataURL(file)
		// }
		
		const addMsg = (type: string, index: number) => {
			setActiveMsg(index);
			switch (type) {
				case 'img':
					imgInputRef.current.click();
					break;
				case 'text':
					let textData = {
						type: 'text',
						text: '',
					};
					step.insertPayload('msg', index, textData);
					break;
				case 'file':
					fileInputRef.current.click();
					break;
				case 'video':
					let videoData = {
						type: 'video',
						url: '',
						video_id: '',
					};
					step.insertPayload('msg', index, videoData);
					break;
				case 'audio':
					audioInputRef.current.click();
					break;
			}
			//just for re-render
			activeReRender(!reRender);
		};
		
		return (
			<div className="props-component">
				{
					step.payload['msg'] ? (
						<Fragment>
							{
								!step.payload['msg'].length ? (
									<Fragment>
										<div className="msg-item-control only-menu">
											<MenuMsg index={0} addMsg={addMsg}/>
										</div>
									</Fragment>
								) : (
									<Fragment></Fragment>
								)
							}
							{
								step.payload['msg'].map((item: any, index: number) => {
									if (item.type === 'text') {
										return (
											<TextMsg key={Math.random()} index={index} addMsg={addMsg}/>
										);
									}
									if (item.type === 'img') {
										return (
											<ImgMsg key={Math.random()} index={index} addMsg={addMsg}/>
										);
									}
									if (item.type === 'file') {
										return (
											<FileMsg key={Math.random()} index={index} addMsg={addMsg}/>
										);
									}
									// if (item.type === 'audio') {
									//     return (
									//         <AudioMsg key={Math.random()} index={index} addMsg={addMsg} />
									//     )
									// }
									// if (item.type === 'video') {
									//     return (
									//         <VideoMsg key={Math.random()} index={index} addMsg={addMsg} />
									//     )
									// }
									return null;
								})
							}
						</Fragment>
					) : (
						<Fragment>
							<div className="msg-item-control only-menu">
								<MenuMsg index={0} addMsg={addMsg}/>
							</div>
						</Fragment>
					)
				}
				<div className="send-attachment">
					<input
						ref={imgInputRef}
						type="file"
						hidden
						onChange={imgChange}
					/>
					<input
						ref={fileInputRef}
						type="file"
						hidden
						onChange={fileChange}
					/>
					{/*<input*/}
					{/*    ref={audioInputRef}*/}
					{/*    type="file"*/}
					{/*    hidden*/}
					{/*    onChange={audioChange}*/}
					{/*/>*/}
				</div>
			</div>
		);
		
	}),
);

export default SendInput;
