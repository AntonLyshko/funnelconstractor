import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IFlowchartStore } from '@stores/interface'
import { Select, Input, Button, InputNumber } from 'antd';
import { Icon } from '@ui'

type TProps = {
    variableStore?: IVariableStore,
    flowchartStore?: IFlowchartStore,
}

const InitVariables = inject((stores: IStores) => ({
    variableStore: stores.variableStore,
    flowchartStore: stores.flowchartStore,
}))(
    observer((props: TProps) => {
        const { variableStore } = props;
        const variables = variableStore.activeVariables


        const onChangeName = (index: number, value: string) => {
            variables[index].setName(value)
        }

        const onChangeValue = (index: number, value: string | number) => {

            variables[index].setValue(value)
        }

        const handleAddVariable = () => {
            variableStore.writeVariable('', '', '')
        }

        const handleChangeType = (index: number, value: string) => {
            variables[index].setType(value)
        }

        const handleDeleteVariable = (id: string) => {
            variableStore.deleteVariable(id)
        }

        const { Option } = Select;



        if (variables) {
            return (
                <div className='props-component'>
                    <Fragment>
                        {variables.length ? (
                            <Fragment>
                                {
                                    variables.map((item, index) => {

                                        return (
                                            <div key={item.id} className="variable-item">
                                                <div className="variable-item-content">
                                                    <div className="variable-item-header">
                                                        <Input className='variable-input full' type="text" placeholder='Название переменной' value={item.name} onChange={(e) => onChangeName(index, e.target.value)} />
                                                    </div>
                                                    <div className="variable-item-body">
                                                        <Select className='variable-select full' defaultValue={item.type} style={{ width: 120, fontSize: 12, borderRadius: 3 }} onChange={(value) => handleChangeType(index, value)}>
                                                            <Option value="string">Строка</Option>
                                                            <Option value="number">Число</Option>
                                                            <Option value="boolean">Логическая</Option>
                                                        </Select>
                                                        {
                                                            item.type === 'boolean' ?
                                                                (
                                                                    <Select className='variable-select boolean' defaultValue='true' style={{ fontSize: 12, borderRadius: 3 }} onChange={(value) => onChangeValue(index, value)}>
                                                                        <Option value='true'>TRUE</Option>
                                                                        <Option value='false'>FALSE</Option>
                                                                    </Select>
                                                                ) : (<Fragment></Fragment>)
                                                        }
                                                        {
                                                            item.type === 'string' ?
                                                                (
                                                                    <Input type="text" className='variable-input' placeholder='Значение по умолчанию' value={item.value} onChange={(e) => onChangeValue(index, e.target.value)} />
                                                                ) : (<Fragment></Fragment>)
                                                        }
                                                        {
                                                            item.type === 'number' ?
                                                                (
                                                                    <InputNumber type="text" className='variable-input' placeholder='Значение по умолчанию' value={item.value} onChange={(value) => onChangeValue(index, value)} />
                                                                ) : (<Fragment></Fragment>)
                                                        }

                                                    </div>
                                                </div>
                                                <div onClick={() => handleDeleteVariable(item.id)} className="delete-variable-trigger">
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
                                        Добавить переменную
                                    </div>

                                </Fragment>
                            )}
                    </Fragment>
                    <div className='add-trigger-container'>
                        <Button onClick={() => handleAddVariable()} className='add-variable-trigger'>
                            +
                        </Button>

                    </div>

                </div >
            )
        } else {
            return null
        }
    })
)

export default InitVariables;