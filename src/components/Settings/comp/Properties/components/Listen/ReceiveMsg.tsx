import React, { useState, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore, IFlowchartStore } from '@stores/interface'
import MenuVariables from '../Variables/variable_comp/MenuVariables'
import { Input, Select, InputNumber, Popover, Button, Collapse } from 'antd'

type TProps = {
    variableStore?: IVariableStore,
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore
}

const ReceiveMsg = inject((stores: IStores) => ({
    variableStore: stores.variableStore,
    flowchartStore: stores.flowchartStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore } = props;
        const step = scriptStore.activeStep
        const [reRender, activeReRender] = useState(false);
        const [activeField, setActiveField] = useState('');

        const handleMenuSelect = (selectedVariable: any) => {
            let msg = '';
            if (step.payload[activeField]) {
                msg = '' + step.payload[activeField] + ' ' + '{' + selectedVariable.name + '} '
            } else {
                msg = '{' + selectedVariable.name + '} '
            }
            step.setPayload(activeField, msg)

            setTimeout(() => {
                if (activeField !== 'error') flowchartStore.changeTitle(msg)
            }, 100)
            setActiveField('')
            //just for re-render
            activeReRender(!reRender)
        }

        const onChange = (key: string, value: string) => {
            step.setPayload(key, value)
            if (key !== 'error') flowchartStore.changeTitle(value)
            setActiveField('')
            //just for re-render
            activeReRender(!reRender)
        }

        const validationType = (value: string) => {
            step.setPayload('validation_type', value)
            setActiveField('')
            //just for re-render
            activeReRender(!reRender)
        }

        const validationOption = (type: string, value: string) => {
            step.setPayload(type, value)
            setActiveField('')
            //just for re-render
            activeReRender(!reRender)
        }

        const rangeStatus = () => {
            if (step.payload['max'] !== undefined || step.payload['min'] !== undefined) {

                if ((step.payload['min'] !== '' && step.payload['max'] !== '') && (step.payload['max'] !== undefined && step.payload['min'] !== undefined)) {
                    if (step.payload['min'] < step.payload['max']) {
                        return (
                            <div className='announcement'>
                                От {(step.payload['min'] !== '' && step.payload['min'] !== undefined) ? step.payload['min'] : '-∞'}
                                {' '}
                                до {(step.payload['max'] !== '' && step.payload['max'] !== undefined) ? step.payload['max'] : '∞'}
                            </div>
                        )
                    } else {
                        return (<div className='announcement'>Ошибка</div>)
                    }
                } else {
                    return (
                        <div className='announcement'>
                            От {(step.payload['min'] !== '' && step.payload['min'] !== undefined) ? step.payload['min'] : '-∞'}
                            {' '}
                                до {(step.payload['max'] !== '' && step.payload['max'] !== undefined) ? step.payload['max'] : '∞'}
                        </div>
                    )
                }
            }
            return (<div className='announcement'>По умолчанию любое число</div>)
        }

        const onChangeLimit = (value: number) => {
            step.setPayload('limit', value)
        }

        const toggleMenuVariables = (type: string) => {
            setActiveField(type)
        }

        const { TextArea } = Input;
        const { Option } = Select;
        const { Panel } = Collapse;



        return (
            <div className='receive-message props-component'>

                <div className='send-input-container'>
                    <Popover placement="bottomRight" visible={activeField === 'msg'} content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                        <div className='menu-trigger-container in-input'>
                            <Button onClick={() => toggleMenuVariables('msg')} className='variable-trigger in-input'>*</Button>
                        </div>
                    </Popover>
                    <TextArea className='send-input' placeholder='Начальное сообщение...' value={step.payload['msg']} onChange={(e) => onChange('msg', e.target.value)} />
                </div>
                <div className='validation-check'>
                    <div className="validation-check-header">
                        <div className='sub-title-props'>Тип данных </div>
                        <div className='validation-type'>
                            <Select defaultValue={step.payload['validation_type'] ? step.payload['validation_type'] : 'string'} style={{ fontSize: 12, borderRadius: 3 }} onChange={(value) => validationType(value)}>
                                <Option value="string">Строка</Option>
                                <Option value="number">Число</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="validation-check-content">
                        {
                            (step.payload['validation_type'] === 'number') ? (
                                <Fragment>
                                    <div className='validation-option'>
                                        <Input className='variable-input space-right' type="text" placeholder='От' value={step.payload['min']} onChange={(e) => validationOption('min', e.target.value)} />
                                        <Input className='variable-input' type="text" placeholder='До' value={step.payload['max']} onChange={(e) => validationOption('max', e.target.value)} />
                                    </div>
                                    { rangeStatus()}
                                </Fragment>
                            ) : (<Fragment></Fragment>)
                        }
                    </div>

                </div>
                <Collapse bordered={false} accordion>
                    <Panel header="Обработка ошибки " key="1">
                        <div className="accordion-container">
                            <div className='negative-option'>
                                <Popover placement="bottomRight" visible={activeField === 'error'} content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                                    <div className='menu-trigger-container in-input'>
                                        <Button onClick={() => toggleMenuVariables('error')} className='variable-trigger in-input'>*</Button>
                                    </div>
                                </Popover>
                                <TextArea className='send-input' placeholder='Сообщение при ошибке...' value={step.payload['error']} onChange={(e) => onChange('error', e.target.value)} />
                            </div>
                            <div className="limit-container">
                                <div className='sub-title-props no-padding'>Лимит ошибок</div>
                                <InputNumber min={1} max={5} defaultValue={step.payload['limit'] ? step.payload['limit'] : 3} onChange={onChangeLimit} />
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    })
)

export default ReceiveMsg;