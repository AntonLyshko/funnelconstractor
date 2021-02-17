import React, { useState, Fragment, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore } from '@stores/interface'
import { Radio } from 'antd'
import General from '../General'
import Channel from '../../components/Channel'
import Options from '../../components/Listen/Options'
import RepeatControl from '../../components/RepeatControl'
import SetIncome from '../../components/SetIncome';

import MsgBtns from '../../components/Listen/MsgBtns';
import Menu from '../../components/Listen/Menu';


type TProps = {
    scriptStore?: IScriptStore
}


const IncomeTabMsg = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
}))(
    observer((props: TProps) => {
        const { scriptStore } = props
        const step = scriptStore.activeStep
        const [activePanel, setActivePanel] = useState('')

        const onChange = (mode: string) => {
            step.setPayload('mode', mode);
        }

        useEffect(() => {
            if (!step.payload['mode']) {
                step.setPayload('mode', 'listener');
            }
        }, [])

        return (
            <div className="props-item">
                <General />
                <div className="mode-cotrol">
                    <Radio.Group className='row-btns' onChange={(e: any) => onChange(e.target.value)} value={step.payload['mode']} buttonStyle="solid">
                        <Radio.Button value="listener">Слушатель</Radio.Button>
                        <Radio.Button value="msg-btn">Сообщение</Radio.Button>
                        <Radio.Button value="menu">Меню</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    step.payload['mode'] ? (<Fragment>
                        {
                            step.payload['mode'] === 'listener' ? (
                                <Fragment>
                                    <Options />
                                    <RepeatControl activePanel={activePanel} setActivePanel={setActivePanel} />
                                    <SetIncome activePanel={activePanel} setActivePanel={setActivePanel} />
                                </Fragment>
                            ) : (<Fragment></Fragment>)
                        }
                        {
                            step.payload['mode'] === 'msg-btn' ? (
                                <Fragment>
                                    <MsgBtns />
                                </Fragment>
                            ) : (<Fragment></Fragment>)
                        }
                        {
                            step.payload['mode'] === 'menu' ? (
                                <Fragment>
                                    <Menu />
                                </Fragment>
                            ) : (<Fragment></Fragment>)
                        }
                    </Fragment>) : (<Fragment></Fragment>)
                }


                <Channel activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>

        );
    })
)

export default IncomeTabMsg;