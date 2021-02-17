import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IVariableStore, IScriptStore} from '@stores/interface';
import {Tabs, Tag, Divider} from 'antd';
import {Icon, Scrollbars} from '@ui';


type TProps = {
	handleIncomeVariableSelect?: (incomeVariable: any) => void,
	menuSwitch?: boolean,
	isVariable?: boolean,
	handleToolsSelect?: (tool: string) => void;
	handleMenuSelect?: (data: any) => void,
	variableStore?: IVariableStore,
	scriptStore?: IScriptStore,
}
const MenuVariables = inject((stores: IStores) => ({
	variableStore: stores.variableStore,
	scriptStore: stores.scriptStore,
}))(
	observer((props: TProps) => {
		const {variableStore, isVariable, scriptStore, handleMenuSelect} = props;
		const variables = variableStore.activeVariables;
		const constants = variableStore.activeConstants;
		const step = scriptStore.activeStep;
		
		const {TabPane} = Tabs;
		let prevSteps: any = [];
		step.prev_step_id.forEach(prevStepId => {
			let prevStep = scriptStore.getStep(prevStepId);
			prevSteps.push(prevStep);
		});
		
		let incomeVariable: any = false;
		
		if (prevSteps.length) {
			//if (prevStep.shape.class === 'listener') {
			// incomeVariable = {
			//     name: prevStep.view_name,
			//     parent_step_id: prevStep.step_id
			//     id: `income_${Math.random()}`,
			//     type: prevStep.payload['variables'],
			//     name: type,
			//     value: type,
			// }
			//}
		}
		
		const menuMiddleware = (data: any, type: string) => {
			switch (type) {
				case 'variable':
					const variable = variableStore.getVariable(data);
					handleMenuSelect(variable);
					break;
				case 'constant':
					const constant = variableStore.getConstant(data);
					handleMenuSelect(constant);
					break;
				case 'income':
					handleMenuSelect(data);
					break;
				case 'tools':
					let tool = {
						id: `tool_${Math.random}`,
						type: 'boolean',
						name: type,
						value: type,
					};
					handleMenuSelect(tool);
					break;
				default:
					break;
			}
		};
		
		
		return (
			<div className='menu-variables-container'>
				<div>
					<Tabs defaultActiveKey="1" tabPosition={'top'} style={{height: 300}}>
						
						{
							!isVariable ? (
								<TabPane tab={<span className='variable-nav-icon'><Icon name={'solid_tools'}/></span>}
								         key='0'>
									<div className="variable-category-container">
										<Scrollbars autoHide
										            className='left-sidebar-layout scrollbars menu-variable-scroll'>
											<Divider orientation="left">Базовые перменные</Divider>
											<Tag onClick={() => menuMiddleware('Empty', 'tools')}>
												Empty
											</Tag>
											<Tag onClick={() => menuMiddleware('True', 'tools')}>
												True
											</Tag>
											<Tag onClick={() => menuMiddleware('False', 'tools')}>
												False
											</Tag>
										</Scrollbars>
									</div>
								</TabPane>
							) : (
								null
							)
						}
						{
							incomeVariable ? (
								<TabPane tab='Входящие' key='1'>
									<div className="variable-category-container">
										<Scrollbars autoHide
										            className='left-sidebar-layout scrollbars menu-variable-scroll'>
											<Tag onClick={() => menuMiddleware(incomeVariable, 'income')}>
												{incomeVariable.name}
											</Tag>
										</Scrollbars>
									</div>
								</TabPane>
							) : (
								null
							)
						}
						<TabPane tab='Константы' key='3'>
							<div className="variable-category-container">
								<Scrollbars autoHide className='left-sidebar-layout scrollbars menu-variable-scroll'>
									
									{
										constants.map(category => {
											return (
												<Fragment>
													<Divider orientation="left">{category.title}</Divider>
													<div>
														{
															category.items.map(item => {
																return (
																	<Tag
																		onClick={() => menuMiddleware(item.id, 'constant')}>
																		{item.name}
																	</Tag>
																);
																
															})
														}
													</div>
												</Fragment>
											);
										})
									}
								</Scrollbars>
							
							</div>
						</TabPane>
						
						<TabPane tab='Переменные' key='2'>
							<div className="variable-category-container">
								<Scrollbars autoHide className='left-sidebar-layout scrollbars menu-variable-scroll'>
									{
										variables.length ? (
											<Fragment>
												{
													variables.map((item: any) => {
														return (
															<Tag onClick={() => menuMiddleware(item.id, 'variable')}>
																{item.name}
															</Tag>
														);
													})
												}
											</Fragment>
										) : (
											<Fragment>
												<div className="announcement color-dark">
													У вас еще нет переменных, их можно добавить в блок Старт
												</div>
											</Fragment>
										)
									}
								
								</Scrollbars>
							</div>
						</TabPane>
					
					
					</Tabs>
				</div>
			</div>
		);
	}),
);

export default MenuVariables;
