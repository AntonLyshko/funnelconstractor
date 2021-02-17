import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IFlowchartStore} from '@stores/interface';
import Start from './types/action/Start';
import InputMsg from './types/listener/InputMsg';
import IncomeMsg from './types/listener/IncomeMsg';
import SendMsg from './types/action/SendMsg';
import Condition from './types/conditions/Condition';
import Finish from './types/action/Finish';
import Control from './types/action/Control';
import VariableSetting from './types/action/VariableSetting';
import IncomeTabMsg from './types/listener/IncomeTabMsg';
import Timer from './types/conditions/Timer';
import Alarm from './types/conditions/Alarm';
import Switch from './types/conditions/Switch';
import Pause from './types/conditions/Pause';
import {Icon} from '@ui';
import $ from 'jquery';

type TProps = {
	flowchartStore?: IFlowchartStore,
}

const Properties = inject((stores: IStores) => ({
	flowchartStore: stores.flowchartStore,
}))(
	observer((props: TProps) => {
		const {flowchartStore} = props;
		const activeElement = flowchartStore.activeShape;
		
		
		return (
			<div className="settings-content">
				
				{activeElement && (
					<Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '1' && <Start/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '2' && <Finish/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '5' && <VariableSetting/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '3' && <SendMsg/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '8' && <InputMsg/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '7' && <IncomeTabMsg/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '6' && <IncomeMsg/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '9' && <Condition/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '10' && <Switch/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '4' && <Control/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '11' && <Timer/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '12' && <Alarm/>
							}
						</Fragment>
						<Fragment>
							{
								activeElement.model.attributes.menu_item_id === '13' && <Pause/>
							}
						</Fragment>
						{
							$(window).width() < 650 ? (
								<Fragment>
									<div className="delete-flowchart-trigger"
									     onClick={() => flowchartStore.deleteActive()}>
										<Icon name='solid_trash'/>
										Удалить
									</div>
								</Fragment>
							) : (<Fragment></Fragment>)
						}
					</Fragment>
				)
				}
			
			</div>
		
		);
	}),
);

export default Properties;
