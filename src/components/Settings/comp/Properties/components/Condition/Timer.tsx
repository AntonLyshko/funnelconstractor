import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore } from '@stores/interface'
import { InputNumber } from 'antd';



type TProps = {
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore,

}

const TimerComponent = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,

    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore } = props;
        const step = scriptStore.activeStep

        const onChangeHours = (hours: number) => {
            let time = `${hours}ч ${step.payload.minutes ? step.payload.minutes : '00'}м`
            step.setPayload('hours', hours);
            flowchartStore.changePreviewText('bottom', time)
        }

        const onChangeMinutes = (minutes: number) => {
            let time = `${step.payload.hours ? step.payload.hours : '00'}ч ${minutes}м`
            step.setPayload('minutes', minutes);
            flowchartStore.changePreviewText('bottom', time)
        }

        return (
            <div className='props-component'>
                <div className="timer-container">
                    <div className="timer-input">
                        <InputNumber className='height-fix' min={0} max={672} onChange={onChangeHours} defaultValue={step.payload['hours'] ? step.payload['hours'] : 0} /> Ч
                    </div>
                    <div className="timer-input">
                        <InputNumber className='height-fix' min={0} max={59} onChange={onChangeMinutes} defaultValue={step.payload['minutes'] ? step.payload['minutes'] : 0} /> М
                    </div>
                </div>
            </div >
        )
    })
)

export default TimerComponent;