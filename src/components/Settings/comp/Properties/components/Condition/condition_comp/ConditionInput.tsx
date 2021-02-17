import React, {useState, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IScriptStore, IFlowchartStore, IVariableStore} from '@stores/interface';
import {Input, Select, Popover, Button} from 'antd';
import MenuVariables from '../../Variables/variable_comp/MenuVariables';
import SignMenu from './SignMenu';
import {Icon} from '@ui';


type TProps = {
	index?: number,
	scriptStore?: IScriptStore,
	flowchartStore?: IFlowchartStore,
	variablesStore?: IVariableStore,
}

const ConditionInput = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	variablesStore: stores.variableStore,
	flowchartStore: stores.flowchartStore,
}))(observer((props: TProps) => {
		const {scriptStore, flowchartStore, index, variablesStore} = props;
		
		const step = scriptStore.activeStep;
		const [reRender, activeReRender] = useState(false);
		const [popoverSwitch, setPopoverSwitch] = useState('');
		
		const input = step.payload['condition'][index];
		
		const shorter = (name: string, max: number) => {
			if (name.length > max) return name.slice(0, max) + '...';
			return name;
		};
		
		const onChange = (value: string) => {
			step.changePayload('condition', index, 'check', value);
			if (!variablesStore.getVariable(input.variable.id)) {
				step.changePayload('condition', index, 'variable', {});
			}
			updateOption();
		};
		
		const removeCondition = () => {
			step.removePayload('condition', index);
			updateOption();
		};
		
		const togglePopover = (type: string) => {
			if (popoverSwitch !== type) {
				setPopoverSwitch(type);
			} else {
				setPopoverSwitch('');
			}
		};
		
		const handleMenuSelect = (selectedVariable: any) => {
			let variableName = shorter(selectedVariable.name, 15);
			
			if (popoverSwitch == 'variable') {
				step.changePayload('condition', index, 'variable', selectedVariable);
			} else {
				let msg;
				if (input.check) {
					msg = '' + input.check + '' + '{' + variableName + '} ';
				} else {
					msg = '{' + variableName + '} ';
				}
				step.changePayload('condition', index, 'check', msg);
			}
			
			setPopoverSwitch('');
			updateOption();
		};
		
		const updateOption = () => {
			let title = '';
			if (input) {
				for (let i = 0; i < step.payload.condition.length; i++) {
					const el = step.payload.condition[i];
					if (i > 0) {
						title += `& {${shorter(el.variable.name, 15)}} ${el.sign} ${el.check}`;
					} else {
						title += `{${shorter(el.variable.name, 15)}} ${el.sign} ${el.check} `;
					}
				}
			}
			flowchartStore.changeTitle(title);
			//just for re-render
			activeReRender(!reRender);
		};
		
		const handleSignSelect = (sign?: string) => {
			setPopoverSwitch('');
			step.changePayload('condition', index, 'sign', sign);
			updateOption();
		};
		
		
		const {Option} = Select;
		
		return (
			<div className="condition-input-container">
				
				<div key={index} className="variable-item">
					<div className="variable-item-content">
						<div className="variable-item-header">
							<Popover placement="bottom" visible={popoverSwitch === 'variable'}
							         content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true}/>}
							         trigger="click">
								<Button onClick={() => togglePopover('variable')}>
									{shorter(input.variable.name, 25)}
								</Button>
							</Popover>
						</div>
						<div className="variable-item-body">
							{
								input.variable.type !== 'boolean' ? (
									<Fragment>
										<Popover placement="bottom" visible={popoverSwitch === 'sign'}
										         content={<SignMenu handleSignSelect={handleSignSelect}
										                            type={input.variable.type}/>} trigger="click">
											<div onClick={() => togglePopover('sign')}
											     className={`comparison-sign ${popoverSwitch === 'sign' ? 'active' : ''}`}>
												{input.sign}
											</div>
										</Popover>
									</Fragment>
								) : (
									<Fragment></Fragment>
								)
							}
							{
								input.variable ?
									(
										<Fragment>
											{
												input.variable.type == 'boolean' ?
													(
														<Fragment>
															<Select className='full' defaultValue='true'
															        style={{fontSize: 12, borderRadius: 3}}
															        onChange={(value) => onChange(value)}>
																<Option value='true'>TRUE</Option>
																<Option value='false'>FALSE</Option>
															</Select>
														</Fragment>
													)
													:
													(
														<Fragment>
															<Input className='condition-input full' value={input.check}
															       type="text" placeholder=''
															       onChange={(e) => onChange(e.target.value)}/>
															<Popover visible={popoverSwitch === 'input'}
															         placement="bottomRight" content={<MenuVariables
																handleMenuSelect={handleMenuSelect} isVariable={true}/>}
															         trigger="click">
																<div className='menu-trigger-container in-input'>
																	<Button onClick={() => togglePopover('input')}
																	        className='variable-trigger in-input'>*</Button>
																</div>
															</Popover>
														</Fragment>
													)
											}
										</Fragment>
									)
									:
									(
										<Fragment>
											<Input className='condition-input full' value={input.check} type="text"
											       placeholder='' onChange={(e) => onChange(e.target.value)}/>
											<Popover visible={popoverSwitch === 'input'} placement="bottomRight"
											         content={<MenuVariables handleMenuSelect={handleMenuSelect}
											                                 isVariable={true}/>} trigger="click">
												<div className='menu-trigger-container in-input'>
													<Button onClick={() => togglePopover('input')}
													        className='variable-trigger in-input'>*</Button>
												</div>
											</Popover>
										</Fragment>
									)
							}
						</div>
					</div>
				</div>
				
				{/* <div className="condition-varialbe-select">
				 
				 </div>
				 
				 <div className="condition-sign-container">
				 
				 </div>
				 
				 <div className='condition-input'>
				 
				 </div> */}
				
				<div onClick={() => removeCondition()} className='delete-condition-trigger'>
					<Icon name='solid_trash'/>
				</div>
			
			
			</div>
		);
	},
));

export default ConditionInput;
