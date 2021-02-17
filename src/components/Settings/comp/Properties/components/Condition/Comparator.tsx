import React, {useState, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IScriptStore, IFlowchartStore, IVariableStore} from '@stores/interface';
import ConditionInput from './condition_comp/ConditionInput';
import {Button} from 'antd';

type TProps = {
	scriptStore?: IScriptStore,
	flowchartStore?: IFlowchartStore,
	variablesStore?: IVariableStore
}
const Comparator = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	variablesStore: stores.variableStore,
	flowchartStore: stores.flowchartStore,
}))(
	observer((props: TProps) => {
		const {scriptStore, flowchartStore, variablesStore} = props;
		const step = scriptStore.activeStep;
		const variables = variablesStore.activeVariables;
		const constants = variablesStore.activeConstants;
		const [reRender, activeReRender] = useState(false);
		
		const shorter = (name: string, max: number) => {
			if (name.length > max) return name.slice(0, max) + '...';
			return name;
		};
		
		const addCondition = () => {
			let variable: any;
			variables.length ?
				variable = variables[0] ? variables[0] : {name: ''} :
				variable = constants[0].items[0] ? constants[0].items[0] : {name: ''};
			
			let variableName: string = shorter(variable.name, 15);
			let input = {
				variable: variable,
				sign: '=',
				check: variable.type === 'boolean' ? true : '',
			};
			let title = `{${variableName}} ${input.sign} ${input.check}`;
			if (step.payload['condition']) {
				for (let i = 0; i < step.payload.condition.length; i++) {
					const el = step.payload.condition[i];
					title += `& {${shorter(el.variable.name, 15)}} ${el.sign} ${el.check}`;
				}
			}
			step.addPayload('condition', input);
			flowchartStore.changeTitle(title);
			//just for re-render
			activeReRender(!reRender);
		};
		
		return (
			<div className='props-component'>
				<div className="condition-container">
					{
						step.payload['condition'] && step.payload['condition'].length ? (
							<Fragment>
								{
									step.payload['condition'].map((item: any, index: number) => {
										return (
											<ConditionInput index={index}/>
										);
									})
								}
							</Fragment>
						) : (
							<Fragment>
								<div className="announcement">
									Добавьте условие
								</div>
							</Fragment>
						)
					}
				</div>
				<div className="condition-control-btn">
					<div className='add-trigger-container'>
						
						<Button onClick={() => addCondition()} className='add-variable-trigger'>
							+
						</Button>
					
					
					</div>
				</div>
			</div>
		);
	}),
);

export default Comparator;
