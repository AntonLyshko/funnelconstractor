import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IFlowchartStore, IScriptStore, IVariableStore} from '@stores/interface';
import MenuVariables from '../Variables/variable_comp/MenuVariables';
import {Input, Popover, Button} from 'antd';


type TProps = {
	scriptStore?: IScriptStore,
	variableStore?: IVariableStore,
	flowchartStore?: IFlowchartStore
}

const Keywords = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	variableStore: stores.variableStore,
	flowchartStore: stores.flowchartStore,
}))(
	observer((props: TProps) => {
		const {scriptStore, flowchartStore} = props;
		const step = scriptStore.activeStep;
		
		const [keywords, setKeyword] = useState([]);
		const [keywordText, setKeywordText] = useState('');
		const [reRender, activeReRender] = useState(false);
		
		useEffect(() => {
			step.setPayload('compare_type', 'fully');
			if (step.payload['keywords']) setKeywordText(step.payload['keywords'].join(','));
			
		}, []);
		
		
		const onChange = (value: string) => {
			setKeywordText(value);
			setKeyword(value.replace(/\s/g, ' ').split(','));
			step.setPayload('keywords', value.replace(/\s/g, ' ').split(','));
			
			setTimeout(() => {
				flowchartStore.changeTitle(value);
			}, 100);
			//just for re-render
			activeReRender(!reRender);
		};
		
		const handleMenuSelect = (selectedVariable: any) => {
			let msg;
			if (keywordText) {
				msg = '' + keywordText + ' ' + '{' + selectedVariable.name + '}, ';
			} else {
				msg = '{' + selectedVariable.name + '}, ';
			}
			setKeywordText(msg);
			setKeyword(keywordText.replace(/\s/g, '').split(','));
			step.setPayload('keywords', keywords);
			//just for re-render
			activeReRender(!reRender);
		};
		
		
		const {TextArea} = Input;
		
		return (
			<div className='props-component'>
				<div className="textarea-container">
					<Popover placement="bottomRight"
					         content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true}/>}
					         trigger="click">
						<div className='menu-trigger-container in-input'>
							<Button className='variable-trigger in-input'>*</Button>
						</div>
					</Popover>
					<TextArea className='send-input' placeholder='Ключевые фразы через запятую' value={keywordText}
					          onChange={(e) => onChange(e.target.value)}/>
				</div>
			</div>
		);
	}),
);

export default Keywords;
