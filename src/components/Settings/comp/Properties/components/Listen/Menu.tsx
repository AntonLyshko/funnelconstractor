import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IFlowchartStore, IScriptStore, IVariableStore } from '@stores/interface'
import { Input } from 'antd';
import { Icon } from '@ui';

type TProps = {
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
}

const Menu = inject((stores: IStores) => ({
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore } = props;
        const step = scriptStore.activeStep

        const [activeBtn, setActiveBtn] = useState({ row: -1, col: -1 })
        const [reRender, activeReRender] = useState(false);


        useEffect(() => {
            if (step.payload['mode'] === 'menu') {
                flowchartStore.removeAllOption()
                step.removeAllOptions()
                if (!step.payload['menu']) {
                    addBtnItem(2, ['Курсы', "Баланс"])
                    addBtnItem(3, ['Аккаунт', 'Меню', 'Назад'])
                }
                updateOption()
            }
        }, [])


        const addBtnItem = (number: number, contentArray?: any) => {
            let rowId = 0;
            if (step.payload['menu-btn']) {
                rowId = step.payload['menu-btn'].length
            }
            let row: any = {
                id: rowId,
                amount: number,
                items: []
            }
            step.addPayload('menu-btn', row)
            for (let i = 0; i < number; i++) {
                let id = 0;
                let content = '';
                let last = step.payload['menu-btn'][step.payload['menu-btn'].length - 1]
                if (contentArray) content = contentArray[i]
                if (!last.items.length && step.payload['menu-btn'].length >= 2) last = step.payload['menu-btn'][step.payload['menu-btn'].length - 2]
                if (last.items[last.items.length - 1]) id = last.items[last.items.length - 1].id + 1
                let col: any = {
                    id: id,
                    row: rowId,
                    content: content
                }
                step.addPayloadItemAdvanced('menu-btn', rowId, 'items', col)
            }
            updateOption()
        }

        const addBtn = (num: number) => {
            switch (num) {
                case 1:
                    addBtnItem(1)
                    break;
                case 2:
                    addBtnItem(2)
                    break;
                case 3:
                    addBtnItem(3)
                    break;

                default:
                    break;
            }
        }

        const removeBtn = (rowIndex: number) => {
            for (let i = step.payload['menu-btn'][rowIndex].items.length; i >= 0; i--) {
                if (step.payload['menu-btn'][rowIndex].items[i]) {
                    let id = step.payload['menu-btn'][rowIndex].items[i].id
                    flowchartStore.removeOption(id);
                    step.removeOption(id)
                }
            }
            step.removePayload('menu-btn', rowIndex)
        }

        const onChangeBtn = (rowIndex: number, colIndex: number, value: any) => {
            setActiveBtn({ ...activeBtn, row: rowIndex, col: colIndex })
            step.changePayloadItemAdvanced('menu-btn', rowIndex, 'items', colIndex, 'content', value)
            setTimeout(() => {
                updateOption()
            }, 500)
        }

        const updateOption = () => {
            for (let i_row = 0; i_row < step.payload['menu-btn'].length; i_row++) {
                const row = step.payload['menu-btn'][i_row];
                for (let i = 0; i < row.items.length; i++) {
                    const col = row.items[i];
                    step.setOption(col.id, col.content)
                    flowchartStore.changeOption(col.id, col.content)
                }
            }
        }

        const handleMove = (index: number, dir: boolean) => {
            if (dir) {
                if (index !== 0) {
                    step.movePayloadItem('menu-btn', index, index - 1)
                    flowchartStore.removeAllOption()
                    step.removeAllOptions()
                    for (let i_row = 0; i_row < step.payload['menu-btn'].length; i_row++) {
                        const row = step.payload['menu-btn'][i_row];
                        for (let i = 0; i < row.items.length; i++) {
                            const col = row.items[i];
                            step.setOption(step.shape.options.items.length, col.content)
                            flowchartStore.changeOption(step.shape.options.items.length, col.content)
                        }
                    }
                }
            } else {
                if (index !== step.payload['menu-btn'].length - 1) {
                    step.movePayloadItem('menu-btn', index, index + 1)
                    flowchartStore.removeAllOption()
                    step.removeAllOptions()
                    for (let i_row = 0; i_row < step.payload['menu-btn'].length; i_row++) {
                        const row = step.payload['menu-btn'][i_row];
                        for (let i = 0; i < row.items.length; i++) {
                            const col = row.items[i];
                            step.setOption(step.shape.options.items.length, col.content)
                            flowchartStore.changeOption(step.shape.options.items.length, col.content)
                        }
                    }
                }
            }

            //just for re-render
            activeReRender(!reRender)
        }




        return (
            <div className='props-component'>
                <div className="btns-content">
                    {
                        step.payload['menu-btn'] ? (<Fragment>
                            {
                                step.payload['menu-btn'].map((row: any, rowIndex: number) => {
                                    return (
                                        <div className="btns-row-container">
                                            <div className="btns-items-content">
                                                {
                                                    row.items.map((col: any, colIndex: number) => {
                                                        return (
                                                            <div className={`btns-row-item col-${row.amount}`}>
                                                                {/* <Popover placement="bottomRight" visible={activeBtn.col === colIndex && rowIndex === colIndex} content={<MenuVariables handleMenuSelect={handleMenuSelectBtns} isVariable={true} />} trigger="click">
                                                                    <div className='menu-trigger-container in-input'>
                                                                        <Button onClick={() => toggleMenuVariables(rowIndex, colIndex)} className='variable-trigger in-input'>*</Button>
                                                                    </div>
                                                                </Popover> */}
                                                                <Input className='variable-input full text-align-center' type="text" placeholder='Написать сообщение...' value={col.content} onChange={(e) => onChangeBtn(rowIndex, colIndex, e.target.value)} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="msg-item-control no-padding">
                                                <div className='condition-item-arrow'>
                                                    <div onClick={() => handleMove(rowIndex, true)} className='arrow-condition up'>
                                                        <Icon name='solid_angle-up' />
                                                    </div>
                                                    <div onClick={() => handleMove(rowIndex, false)} className='arrow-condition down'>
                                                        <Icon name='solid_angle-down' />
                                                    </div>
                                                </div>
                                                <div onClick={() => removeBtn(rowIndex)} className="menu-btns-delete">
                                                    <Icon name='solid_trash' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>) : (<Fragment></Fragment>)
                    }
                </div>
                <div className="btns-controller">
                    <div className="btns-types">
                        <div onClick={() => addBtn(3)} className="btns-type-item">
                            <div className="menu-btn-prototype col-3">+</div>
                            <div className="menu-btn-prototype col-3">+</div>
                            <div className="menu-btn-prototype col-3">+</div>
                        </div>
                        <div onClick={() => addBtn(2)} className="btns-type-item">
                            <div className="menu-btn-prototype col-2">+</div>
                            <div className="menu-btn-prototype col-2">+</div>
                        </div>
                        <div onClick={() => addBtn(1)} className="btns-type-item">
                            <div className="menu-btn-prototype">+</div>
                        </div>
                    </div>
                </div>




                {/* <Fragment>


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
                </div> */}

            </div>
        )
    })
)

export default Menu;