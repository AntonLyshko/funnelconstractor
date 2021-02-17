import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore, IVariableStore } from '@stores/interface'
import { Select } from 'antd'


type TProps = {
    signSwitch?: boolean,
    changeSign?: (index: number) => void,
    indexItem?: number,
    indexInput?: number,
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore,
    variablesStore?: IVariableStore
}

const ConditionConnector = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    variablesStore: stores.variableStore,
    flowchartStore: stores.flowchartStore
}))(observer((props: TProps) => {
    const { scriptStore, indexItem, indexInput, flowchartStore } = props;
    const step = scriptStore.activeStep

    const input = step.payload['condition'][indexItem][indexInput]
    const item = step.payload['condition'][indexItem]


    const onChange = (value: string) => {
        step.changePayloadItem('condition', indexItem, indexInput, 'connector', value)
        updateOption()
    }

    const updateOption = () => {
        let option = ''
        for (let i = 0; i < item.length; i++) {
            const el = item[i];
            if (el.connector) {
                if (el.connector == 'ИЛИ') {
                    option += `|| `
                }
                if (el.connector == 'И') {
                    option += `& `
                }
            } else {
                option += `{${el.variable.name}} ${el.sign} ${el.check} `
            }
        }
        step.setOption(indexItem, option)
        flowchartStore.changeOption(indexItem, option)
    }

    const { Option } = Select;



    return (
        <div className="condition-connector-container">

            <Fragment>
                <Select className='color-white' defaultValue={input.connector} style={{ fontSize: 12, borderRadius: 3 }} onChange={(value) => onChange(value)} bordered={false}>
                    <Option value='ИЛИ'>ИЛИ</Option>
                    <Option value='И'>И</Option>
                </Select>
            </Fragment>
        </div>
    )
}
))

export default ConditionConnector;