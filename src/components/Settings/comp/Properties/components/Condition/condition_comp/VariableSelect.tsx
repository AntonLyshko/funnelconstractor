import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore, IVariableStore } from '@stores/interface'
import { Select } from 'antd'

type TProps = {
    indexItem?: number,
    indexInput?: number,
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore,
    variablesStore?: IVariableStore
}

const VariableSelect = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    variablesStore: stores.variableStore,
    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { scriptStore, variablesStore, indexItem, indexInput } = props;
        const step = scriptStore.activeStep
        const variables = variablesStore.activeVariables;

        const handleVariableSelect = (index: number) => {
            step.changePayloadItem('condition', indexItem, indexInput, 'variable', variables[index])
        }

        const { Option } = Select;

        return (
            <div className='condition-variable-select'>
                <Select className='full' defaultValue={0} style={{ fontSize: 12, borderRadius: 3 }} onChange={(value) => handleVariableSelect(value)}>
                    {
                        variables.length ? (
                            <Fragment>
                                {
                                    variables.map((item: any, index: number) => {
                                        return (
                                            <Option value={index}>
                                                {item.name}
                                            </Option>
                                        )
                                    })
                                }
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <Option value={0}>
                                        Нет переменных
                                    </Option>
                                </Fragment>
                            )
                    }

                </Select>
            </div>
        )
    })
)

export default VariableSelect;