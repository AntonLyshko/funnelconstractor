import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IFlowchartStore, IScriptStore, IVariableStore } from '@stores/interface'
import { Input, Popover, Button } from 'antd'
import MenuVariables from '../Variables/variable_comp/MenuVariables'
import { Icon } from '@ui';

type TProps = {
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
}

const SwitchRouter = inject((stores: IStores) => ({
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore, variableStore } = props;
        const step = scriptStore.activeStep
        const variables = variableStore.activeVariables

        const [menuSwitch, setMenuSwitch] = useState(false);
        const [activeTab, setActiveTab] = useState(0)
        const [reRender, activeReRender] = useState(false);

        const shorter = (name: string, max: number) => {
            if (name.length > max) return name.slice(0, max) + '...'
            return name
        }

        useEffect(() => {
            if (!step.payload['switch_variable'] && variables[0]) {
                step.setPayload('switch_variable', variables[0])
                flowchartStore.changeTitle(shorter(variables[0].name, 15))
                let default1 = {
                    content: 'Значение 1',
                }
                step.addPayload('route', default1)
                let default2 = {
                    content: 'Значение 2',
                }
                step.addPayload('route', default2)
                let default3 = {
                    content: 'Значение 3',
                }
                step.addPayload('route', default3)
            }
        }, [])

        const addOption = () => {
            if (step.payload['switch_variable']) {
                setMenuSwitch(false)
                let item = {
                    content: '',
                }
                step.addPayload('route', item)
                step.addOption(item.content, { positive: true, negative: false })
                flowchartStore.addOption(item.content, { positive: true, negative: false });
            } else {
                setMenuSwitch(true)
            }
        }

        const removeOption = (index: number) => {
            setMenuSwitch(false)
            step.removeOption(index)
            flowchartStore.removeOption(index);
            step.removePayload('route', index)
            //just for re-render
            activeReRender(!reRender)
        }

        const onChange = (index: number, value: string) => {
            setActiveTab(index)
            step.changePayload('route', index, 'content', value)
            updateOption()

        }

        const handleMenuSelect = (selectedVariable: any) => {
            if (step.payload['switch_variable']) {
                if (activeTab > 0) {
                    const route = step.payload.route[activeTab]
                    let msg;
                    if (route[activeTab]) {
                        msg = '' + route.content + '' + '{' + selectedVariable.name + '} '
                    } else {
                        msg = '{' + selectedVariable.name + '}'
                    }
                    step.changePayload('route', activeTab, 'content', msg)
                    updateOption()
                } else {
                    flowchartStore.changeTitle(shorter(selectedVariable.name, 15))
                    step.setPayload('switch_variable', selectedVariable)
                }
            }
            setMenuSwitch(false)
        }

        const editSwitchVariable = () => {
            setMenuSwitch(true)
            setActiveTab(-1)
        }


        const toggleMenuVariables = (index: number) => {
            setActiveTab(index)
        }

        const updateOption = () => {
            setMenuSwitch(false)
            const route = step.payload['route'][activeTab]
            step.setOption(activeTab, route.content)
            flowchartStore.changeOption(activeTab, shorter(route.content, 15))
        }

        return (
            <div className='props-component'>
                <div className='sub-title-props'>
                    {
                        step.payload['switch_variable'] ? (
                            <Popover placement="bottom" visible={menuSwitch} content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                                <Button onClick={() => editSwitchVariable()}>
                                    {shorter(step.payload['switch_variable'].name, 25)}
                                </Button>
                            </Popover>
                        ) : (
                                <Fragment></Fragment>
                            )
                    }

                </div>
                <Fragment>
                    {step.payload.route ? (
                        <Fragment>
                            {
                                step.payload.route.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="variable-item">
                                            <div className="input-opition-container">
                                                <Popover placement="bottomRight" content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                                                    <div className='menu-trigger-container in-input'>
                                                        <Button onClick={() => toggleMenuVariables(index)} className='variable-trigger in-input'>*</Button>
                                                    </div>
                                                </Popover>
                                                <Input className='options-input' type="text" placeholder={`Ответ ${index + 1}`} value={item.content} onChange={(e) => onChange(index, e.target.value)} />
                                            </div>
                                            <div onClick={() => removeOption(index)} className="msg-item-delete-trigger option-delete">
                                                <Icon name='solid_trash' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : (
                            <Fragment>
                                <div className='announcement'>
                                    Добавить переменную для сравнения
                                </div>
                            </Fragment>
                        )}
                </Fragment>
                <div className='add-trigger-container'>

                    <Button onClick={() => addOption()} className='add-variable-trigger'>
                        +
                        </Button>

                </div>
            </div>
        )
    })
)

export default SwitchRouter;