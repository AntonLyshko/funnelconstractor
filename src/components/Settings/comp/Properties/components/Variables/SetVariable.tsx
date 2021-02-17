import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore } from '@stores/interface'
import { Input, Popover, Button } from 'antd';
import MenuVariables from './variable_comp/MenuVariables'

import VariableName from './VariableName'

type TProps = {
    variableStore?: IVariableStore,
    scriptStore?: IScriptStore,
}

const SetVariable = inject((stores: IStores) => ({
    variableStore: stores.variableStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { variableStore, scriptStore } = props;
        const step = scriptStore.activeStep
        const addedVariables = variableStore.activeVariables
        const [activeVarId, setActiveVarId] = useState('')
        const [activeVarIndex, setActiveVarIndex] = useState(-1)

        const onChange = (id: string, index: number, value: string) => {
            let variable = variableStore.getVariable(id)
            variable.setValue(value)
            step.setPayloadItem('changed_variables', index, variable)
        }

        const handleMenuSelect = (selectedVariable: any) => {
            let variable = variableStore.getVariable(activeVarId)
            let value;
            if (step.payload['changed_variables'] && step.payload['changed_variables'][activeVarIndex]) {
                value = '' + variable.value + '' + '{' + selectedVariable.name + '} '
            } else {
                value = '{' + selectedVariable.name + '}'
            }
            step.setPayloadItem('changed_variables', activeVarIndex, variable)
            variable.setValue(value)
            step.changePayload('changed_variables', activeVarIndex, 'value', value)
        }

        const toggleMenuVariables = (id?: string, index?: number) => {
            setActiveVarId(id)
            setActiveVarIndex(index)
        }


        return (
            <div className='change-variable props-component'>
                <Fragment>
                    {
                        addedVariables ? (
                            <Fragment>
                                {
                                    addedVariables.length ? (
                                        <Fragment>
                                            {
                                                addedVariables.map((item: any, index: number) => {
                                                    return (
                                                        <Fragment>
                                                            <div key={item.id} className="variable-item set-variable">
                                                                <div className="variable-header">
                                                                    <VariableName name={item.name} max={28} />
                                                                </div>
                                                                <div className="variable-content">
                                                                    <Popover placement="bottomRight" content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                                                                        <div className='menu-trigger-container in-input'>
                                                                            <Button onClick={() => toggleMenuVariables(item.id, index)} className='variable-trigger in-input'>*</Button>
                                                                        </div>
                                                                    </Popover>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder={item.value}
                                                                        value={step.payload['changed_variables'] ? (step.payload['changed_variables'][index] ? step.payload['changed_variables'][index].value : '') : ''}
                                                                        onChange={(e) => onChange(item.id, index, e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </Fragment>
                                    ) : (
                                            <Fragment>
                                                <div className="announcement">
                                                    Нет переменных
                                    </div>
                                            </Fragment>
                                        )
                                }
                            </Fragment>
                        ) : (
                                <Fragment></Fragment>
                            )
                    }
                </Fragment>

            </div>
        )
    })
)

export default SetVariable;