import React from 'react';
import './Tabs.scss';
import Tab from './Tab/Tab';
import { inject, observer } from 'mobx-react';
import { default as IStores, IFlowchartStore, ISettings } from '@stores/interface';
import { Icon } from '@ui'

type IProps = {
    settings?: ISettings;
    flowchartStore?: IFlowchartStore;

}

const Tabs = inject((stores: IStores) => ({ settings: stores.appStore.settings, flowchartStore: stores.flowchartStore }))(
    observer((props: IProps) => {
        const { settings, flowchartStore } = props;
        const activeTab = settings.activeTab;

        const onActive = (name: string) => {
            if (name === 'chat') settings.openChat()
            if (name === 'properties') settings.openSettings()
        }

        const closeSettings = () => {
            flowchartStore.setActive(null)
            settings.closeSettings()
        }

        return (
            <div className='tabs-container'>
                <Tab onActive={onActive} active={activeTab === 'chat'} title='Чат' icon='solid_comment-dots' name='chat' />
                <Tab onActive={onActive} active={activeTab === 'settings'} title='Свойства' icon='solid_cog' name='properties' />
                <div className="close-settings-trigger" onClick={() => closeSettings()} >
                    <Icon className='medium-icon' name="solid_times" />
                </div>

            </div>
        );
    }
    )
)

export default Tabs;