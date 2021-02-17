import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore } from '@stores/interface'
import { Switch } from 'antd';
import { Collapse } from 'antd';


type TProps = {
    activePanel?: string,
    setActivePanel?: (name: string) => void;
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore
}


const Channel = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore, setActivePanel, activePanel } = props;
        const activeStep = scriptStore.activeStep
        const channel = activeStep.shape.channel

        const onChange = (channel: string) => {
            flowchartStore.toggleChannel(channel)
            activeStep.toggleChannel(channel)
        }

        const { Panel } = Collapse;

        return (
            <div className="props-component">
                <Collapse onChange={() => { activePanel === 'Channel' ? setActivePanel('') : setActivePanel('Channel') }} bordered={false} accordion activeKey={activePanel === 'Channel' ? 1 : null}>
                    <Panel header="Настроить каналы" key="1">
                        <div className='channel-container'>
                            <div className='channel-item'>
                                <div className='channel-text'>Telegram</div>
                                <Switch size="small" defaultChecked={channel['telegram']} onChange={() => onChange('telegram')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Whatsapp</div>
                                <Switch size="small" defaultChecked={channel['whatsapp']} onChange={() => onChange('whatsapp')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Viber</div>
                                <Switch size="small" defaultChecked={channel['viber']} onChange={() => onChange('viber')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Instagram</div>
                                <Switch size="small" defaultChecked={channel['instangram']} onChange={() => onChange('instangram')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Vk</div>
                                <Switch size="small" defaultChecked={channel['vk']} onChange={() => onChange('vk')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Facebook</div>
                                <Switch size="small" defaultChecked={channel['facebook']} onChange={() => onChange('facebook')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>Одноклассники</div>
                                <Switch size="small" defaultChecked={channel['ok']} onChange={() => onChange('ok')} />
                            </div>
                            <div className='channel-item'>
                                <div className='channel-text'>E-mail</div>
                                <Switch size="small" defaultChecked={channel['email']} onChange={() => onChange('email')} />
                            </div>
                        </div >
                    </Panel>
                </Collapse>
            </div>
        );
    })
)

export default Channel;