import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore } from '@stores/interface'
import { InputNumber } from 'antd'


type TProps = {
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore
}

const ControlPort = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { flowchartStore } = props;
        const activeElement = flowchartStore.activeElement

        const changePositive = (value: number) => {
            if (value >= 10) value = 10
            if (value <= 0) value = 1
            flowchartStore.changePort('positive', value)
        }

        const changeNegative = (value: number) => {
            if (value >= 10) value = 10
            if (value <= 0) value = 1
            flowchartStore.changePort('negative', value)
        }

        return (
            <div className='props-component'>

                <div className="control-props-item">
                    <div className="sub-title-props">
                        Положительные порты
                    </div>
                    <InputNumber className='number-input' defaultValue={activeElement.model.attributes.body.controlPort.positive} min={1} max={10} onChange={changePositive} />
                </div>

                <div className="control-props-item">
                    <div className="sub-title-props">
                        Негативные порты
                    </div>
                    <InputNumber className='number-input' defaultValue={activeElement.model.attributes.body.controlPort.negative} min={1} max={10} onChange={changeNegative} />
                </div>

            </div>
        )
    })
)

export default ControlPort;