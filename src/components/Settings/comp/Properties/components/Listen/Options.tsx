import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IFlowchartStore, IScriptStore, IVariableStore } from '@stores/interface'
import { Input, Popover, Button } from 'antd';
import MenuVariables from '../Variables/variable_comp/MenuVariables'
import { Icon } from '@ui';

type TProps = {
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
}

const Options = inject((stores: IStores) => ({
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore } = props;
        const step = scriptStore.activeStep

        const [activeTab, setActiveTab] = useState(0)
        const [reRender, activeReRender] = useState(false);


        useEffect(() => {
            if (step.payload['mode'] === 'listener') {

                // step.removeAllOptions()
                // flowchartStore.removeAllOption()

                if (!step.payload['option']) {
                    let default1: any = {
                        content: 'Курсы'
                    }
                    step.addPayload('option', default1)
                    let default2: any = {
                        content: 'Баланс'
                    }
                    step.addPayload('option', default2)
                    let default3: any = {
                        content: 'Аккаунт'
                    }
                    step.addPayload('option', default3)
                }

                updateAll()
            }

        }, [])

        const addOption = () => {
            let value: any = {
                content: ''
            }
            step.addPayload('option', value)
            step.addOption('', { positive: true, negative: false })
            flowchartStore.addOption('', { positive: true, negative: false });
        }

        const removeOption = (index: number) => {
            step.removeOption(index)
            flowchartStore.removeOption(index);
        }

        const onChange = (index: number, value: string) => {
            step.changePayload('option', index, 'content', value)
            step.setOption(index, value)
            flowchartStore.changeOption(index, value)
            setActiveTab(index)
        }

        const handleMenuSelect = (selectedVariable: any) => {
            const option = step.payload.option[activeTab]
            let msg;
            if (option) {
                msg = '' + option.content + '' + '{' + selectedVariable.name + '} '
            } else {
                msg = '{' + selectedVariable.name + '}'
            }
            step.changePayload('option', activeTab, 'content', msg)
            updateOption()
            //just for re-render
            activeReRender(!reRender)
        }

        const updateOption = () => {
            const option = step.payload.option[activeTab]
            step.setOption(activeTab, option.content)
            flowchartStore.changeOption(activeTab, option.content)
        }

        const updateAll = () => {
            for (let i = 0; i < step.payload['option'].length; i++) {
                const option = step.payload['option'][i];
                step.setOption(i, option.content)
                flowchartStore.changeOption(i, option.content)
            }

        }

        const toggleMenuVariables = (index?: number) => {
            setActiveTab(index)
        }



        return (
            <div className='props-component'>
                <Fragment>
                    {step.shape.options.items ? (
                        <Fragment>
                            {
                                step.shape.options.items.map((item: any, index: number) => {
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
                                    Добавить вариант ответа
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

export default Options;