import React from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IScriptStore, IFlowchartStore} from '@stores/interface';
import {Radio, Collapse} from 'antd';


type TProps = {
	activePanel?: string,
	setActivePanel?: (name: string) => void;
	flowchartStore?: IFlowchartStore,
	scriptStore?: IScriptStore
}


const ComprasionType = inject((stores: IStores) => ({
	scriptStore: stores.scriptStore,
	flowchartStore: stores.flowchartStore,
}))(
	observer((props: TProps) => {
		const {scriptStore, setActivePanel, activePanel} = props;
		const step = scriptStore.activeStep;
		// const [reRender, activeReRender] = useState(false);
		
		const onChange = (value: string) => {
			step.setPayload('comprasion_type', value);
		};
		
		// const changeCompare = (value: number) => {
		// 	step.setPayload('compare_count', value);
		// 	//just for re-render
		// 	activeReRender(!reRender);
		// };
		
		
		const {Panel} = Collapse;
		
		return (
			<div className="props-component">
				<div className="comprasion-type">
					<Collapse onChange={() => {
						activePanel === 'ComprasionType' ? setActivePanel('') : setActivePanel('ComprasionType');
					}} bordered={false} accordion activeKey={activePanel === 'ComprasionType' ? 1 : null}>
						<Panel header="Тип сравнения" key="1">
							<div className="accordion-container">
								<Radio.Group onChange={(e) => onChange(e.target.value)}
								             value={step.payload['comprasion_type'] ? step.payload['comprasion_type'] : 'full'}>
									<div className="accordion-item">
										<Radio value='full'>
											<div className="variable-list-item full">
												Полный. <text>Сработает если все ключевые<br/>фразы были в ответе
												пользователя.</text>
											</div>
										</Radio>
									</div>
									<div className="accordion-item">
										<Radio value='partly'>
											<div className="variable-list-item full">
												Частичный. <text>Сработает если <br/>хотя бы одна ключевых фраза была в
												ответе пользователя.</text>
											</div>
										</Radio>
									</div>
								</Radio.Group>
							</div>
							{/*{*/}
							{/*    step.payload['comprasion_type'] === 'partly' ? (*/}
							{/*        <div className='compare-number'>*/}
							{/*            <div className='sub-title-props'>Количество совпадений</div>*/}
							{/*            <InputNumber className='number-input' defaultValue={0} min={0} max={step.payload['keywords'] && step.payload['keywords'].length > 0 ? step.payload['keywords'].length : 0} onChange={changeCompare} />*/}
							{/*        </div>*/}
							{/*    ) : (*/}
							{/*            <Fragment></Fragment>*/}
							{/*        )*/}
							{/*}*/}
						</Panel>
					</Collapse>
				</div>
			</div>
		);
	}),
);

export default ComprasionType;
