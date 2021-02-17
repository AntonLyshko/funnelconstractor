import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore } from '@stores/interface'
import { Radio, Collapse } from 'antd';



type TProps = {
    activePanel?: string,
    setActivePanel?: (name: string) => void;
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore
}


const RepeatControl = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { scriptStore, setActivePanel, activePanel } = props;
        const step = scriptStore.activeStep

        useEffect(() => {
            if (!step.payload['listener_type']) {
                step.setPayload('listener_type', 'always')
            }
        }, [])

        const onChange = (value: string) => {
            step.setPayload('listener_type', value)
        }

        const { Panel } = Collapse;



        return (
            <div className="props-component">
                <div className="repeat-control">
                    <Collapse onChange={() => { activePanel === 'RepeatControl' ? setActivePanel('') : setActivePanel('RepeatControl') }} bordered={false} accordion activeKey={activePanel === 'RepeatControl' ? 1 : null}>
                        <Panel header="Режим работы " key="1">
                            <div className="accordion-container">
                                <Radio.Group onChange={(e) => onChange(e.target.value)} value={step.payload['listener_type'] ? step.payload['listener_type'] : 'always'}>
                                    <div className="accordion-item">
                                        <Radio value='once'>
                                            <div className="variable-list-item full">
                                                Один раз. <text>Слушатель срабатывает<br />только один раз.</text>
                                            </div>
                                        </Radio>
                                    </div>
                                    <div className="accordion-item">
                                        <Radio value='always'>
                                            <div className="variable-list-item full">
                                                Всегда <text>Слушатель срабатывает<br />всегда при соотвествующей команде</text>
                                            </div>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div >
        );
    })
)

export default RepeatControl;