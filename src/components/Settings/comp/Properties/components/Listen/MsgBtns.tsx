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

const MsgBtns = inject((stores: IStores) => ({
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
            if (step.payload['mode'] === 'msg-btn') {
                flowchartStore.removeAllOption()
                step.removeAllOptions()
                if (!step.payload['msg-btn']) {

                    addBtnItem(1, ['Курсы'])
                    addBtnItem(1, ["Баланс"])
                    addBtnItem(1, ['Аккаунт'])
                    addBtnItem(1, ['Назад'])
                }
                updateOption()
            }
        }, [])


        const addBtnItem = (number: number, contentArray?: any) => {
            let rowId = 0;
            if (step.payload['msg-btn']) {
                let last = step.payload['msg-btn'][step.payload['msg-btn'].length - 1]
                rowId = last.id + 1
            }
            let row: any = {
                id: rowId,
                amount: number,
                items: []
            }
            step.addPayload('msg-btn', row)
            for (let i = 0; i < number; i++) {
                let id = 0;
                let content = '';
                let last = step.payload['msg-btn'][step.payload['msg-btn'].length - 1]
                if (contentArray) content = contentArray[i]
                if (!last.items.length && step.payload['msg-btn'].length >= 2) last = step.payload['msg-btn'][step.payload['msg-btn'].length - 2]
                if (last.items[last.items.length - 1]) id = last.items[last.items.length - 1].id + 1
                let col: any = {
                    id: id,
                    row: rowId,
                    content: content
                }
                step.addPayloadItemAdvanced('msg-btn', rowId, 'items', col)
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
            for (let i = step.payload['msg-btn'][rowIndex].items.length; i >= 0; i--) {
                if (step.payload['msg-btn'][rowIndex].items[i]) {
                    let id = step.payload['msg-btn'][rowIndex].items[i].id
                    flowchartStore.removeOption(id);
                    step.removeOption(id)
                }
            }
            step.removePayload('msg-btn', rowIndex)
        }

        const onChange = (value: string) => {
            step.setPayload('title', value);
            flowchartStore.changeTitle(value)
        }
        const onChangeBtn = (rowIndex: number, colIndex: number, value: any) => {
            setActiveBtn({ ...activeBtn, row: rowIndex, col: colIndex })
            step.changePayloadItemAdvanced('msg-btn', rowIndex, 'items', colIndex, 'content', value)
            setTimeout(() => {
                updateOption()
            }, 500)
        }




        const handleMenuSelect = (selectedVariable: any) => {
            const title = step.payload['title']
            let msg: string;
            if (title) {
                msg = '' + title.content + '' + '{' + selectedVariable.name + '} '
            } else {
                msg = '{' + selectedVariable.name + '}'
            }
            step.setPayload('title', msg);
            updateOption()
            //just for re-render
            activeReRender(!reRender)
        }

        const updateOption = () => {
            for (let i = 0; i < step.payload['msg-btn'].length; i++) {
                const row = step.payload['msg-btn'][i];
                for (let i = 0; i < row.items.length; i++) {
                    const col = row.items[i];
                    step.setOption(col.id, col.content)
                    flowchartStore.changeOption(col.id, col.content)
                }
            }
        }

        // const handleMenuSelectBtns = (selectedVariable: any) => {
        //     let btn = step.payload[activeBtn.row].items[activeBtn.col]
        //     let msg: string
        //     if (btn.content) {
        //         msg = '' + btn.content + '' + '{' + selectedVariable.name + '} '
        //     } else {
        //         msg = '{' + selectedVariable.name + '}'
        //     }
        //     step.changePayloadItem('btn', activeBtn.row, 'items', activeBtn.col, msg)
        //     updateOption()
        //     //just for re-render
        //     activeReRender(!reRender)
        // }
        // const toggleMenuVariables = (rowIndex: number, colIndex: number) => {
        //     setActiveBtn({ ...activeBtn, row: rowIndex, col: colIndex })
        // }

        const handleMove = (index: number, dir: boolean) => {

            if (dir) {
                if (index !== 0) {
                    for (let i = 0; i < step.payload['msg-btn'][index].items.length; i++) {
                        let col = step.payload['msg-btn'][index].items[i]
                        let steps = step.payload['msg-btn'][index - 1].amount
                        let optionIndex = step.shape.options.items.findIndex((item: any) => item.content === col.content)
                        step.moveOption(optionIndex, optionIndex - steps)
                        flowchartStore.moveOption(optionIndex, optionIndex - steps)

                    }
                    step.movePayloadItem('msg-btn', index, index - 1)
                }
            } else {
                if (index !== step.payload['msg-btn'].length - 1) {
                    for (let i = 0; i < step.payload['msg-btn'][index].items.length; i++) {
                        let col = step.payload['msg-btn'][index].items[i]
                        let steps = step.payload['msg-btn'][index + 1].amount
                        let optionIndex = step.shape.options.items.findIndex((item: any) => item.content === col.content)
                        step.moveOption(optionIndex, optionIndex + steps)
                        flowchartStore.moveOption(optionIndex, optionIndex + steps)

                    }
                    step.movePayloadItem('msg-btn', index, index + 1)
                }
            }

            //just for re-render
            activeReRender(!reRender)
        }



        const { TextArea } = Input;




        return (
            <div className='props-component'>
                <div className="msg-title-contai">
                    <Popover placement="bottomRight" content={<MenuVariables handleMenuSelect={handleMenuSelect} isVariable={true} />} trigger="click">
                        <div className='menu-trigger-container in-input'>
                            <Button className='variable-trigger in-input'>*</Button>
                        </div>
                    </Popover>
                    <TextArea className='send-input' placeholder='Ваше сообщение' value={step.payload.title} onChange={(e) => onChange(e.target.value)} />
                </div>

                <div className="btns-content">
                    {
                        step.payload['msg-btn'] ? (<Fragment>
                            {
                                step.payload['msg-btn'].map((row: any, rowIndex: number) => {
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
                        <div onClick={() => addBtn(1)} className="btns-type-item">
                            <div className="menu-btn-prototype">+</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
)

export default MsgBtns;