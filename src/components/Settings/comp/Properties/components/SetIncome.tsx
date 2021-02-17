import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore } from '@stores/interface'
import { Switch, Collapse } from 'antd';
import VariableName from './Variables/VariableName'

type TProps = {
    activePanel?: string,
    setActivePanel?: (name: string) => void;
    variableStore?: IVariableStore,
    scriptStore?: IScriptStore,
}

const SetIncome = inject((stores: IStores) => ({
    variableStore: stores.variableStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, variableStore, activePanel, setActivePanel } = props;
        const step = scriptStore.activeStep
        const addedVariables = variableStore.activeVariables


        const onChange = (checked: boolean, index: number, id: string) => {
            const variable = variableStore.getVariable(id)

            if (checked) {
                if (step.payload['set_variable']) {
                    if (!step.payload['set_variable'][index]) {
                        step.addPayload('set_variable', variable)
                    }
                } else {
                    step.addPayload('set_variable', variable)
                }
            } else {
                step.removePayload('set_variable', index)
            }
        }

        const { Panel } = Collapse;


        return (
            <div className='change-variable props-component'>
                <Collapse onChange={() => { activePanel === 'SetIncome' ? setActivePanel('') : setActivePanel('SetIncome') }} bordered={false} accordion activeKey={activePanel === 'SetIncome' ? 1 : null} >
                    <Panel header="Сохранить в переменную " key="1">
                        <div className="accordion-container">
                            <Fragment>
                                {
                                    addedVariables ? (
                                        <Fragment>

                                            {
                                                addedVariables.map((item: any, index: number) => {
                                                    return (
                                                        <div className="set-variable-item">
                                                            <Switch size="small" onChange={(checked) => onChange(checked, index, item.id)} />
                                                            <div className="variable-list-item full">
                                                                <VariableName name={item.name} max={25} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </Fragment>
                                    ) : (
                                            <Fragment>
                                                <div className="announcement">
                                                    У вас нет переменных<br /> Их можно добавить в блоке Старт
                                                </div>
                                            </Fragment>
                                        )
                                }
                            </Fragment>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    })
)

export default SetIncome;