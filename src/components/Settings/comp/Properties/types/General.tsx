import React, {useState, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IScriptStore, IFlowchartStore} from '@stores/interface';
import {Switch, Input} from 'antd';
import {Icon} from '@ui';

type TProps = {
	editable?: boolean | true,
	scriptStore?: IScriptStore,
	flowchartStore?: IFlowchartStore
}


const General = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	flowchartStore: stores.flowchartStore,
}))(
	observer((props: TProps) => {
		const {scriptStore, flowchartStore, editable} = props;
		const step = scriptStore.activeStep;
		const [switchEdit, setSwitchEdit] = useState(false);
		
		const switchToggle = () => {
			step.setPayload('switch', !step.payload['switch']);
			flowchartStore.switchToggle();
		};
		
		const onChange = (value: string) => {
			step.setViewName(value);
			if (editable) flowchartStore.changeTitle(value);
		};
		
		
		return (
			<div className="props-item-header">
				
				<div className="props-header-control">
					<div className="props-id">
						ID блока: {step.step_id}
					</div>
					<Switch checkedChildren="I" unCheckedChildren="0" defaultChecked={step.payload['switch']}
					        onChange={() => switchToggle()}/>
				</div>
				<div className="props-flowchart-name-container">
					<div className="props-flowchart-name-content">
						<div className="props-flowchart-name">
							{
								switchEdit ? (
									<div className="edit-view-name">
										<Input type="text" placeholder='Название блока...' value={step.view_name}
										       onChange={(e) => onChange(e.target.value)}/>
									</div>
								) : (
									<Fragment>
										{step.view_name}
									</Fragment>
								)
							}
						</div>
						<div onClick={() => setSwitchEdit(!switchEdit)} className="flowchart-name-edit-trigger">
							{
								switchEdit ? (
									<Icon name='solid_save'/>
								) : (
									<Icon name='solid_pencil-alt'/>
								)
							}
						</div>
					</div>
				</div>
			
			</div>
		
		);
	}),
);

export default General;
