import React from 'react';
import './Settings.scss';
import { inject, observer } from 'mobx-react';
import Tabs from '@components/Settings/comp/Tabs/Tabs';
import Properties from '@components/Settings/comp/Properties/Properties';
import Chat from '@components/Settings/comp/Chat/Chat'
import { default as IStores, ISettings } from '@stores/interface';

type IProps = {
    settings?: ISettings;
}

const Settings = inject((stores: IStores) => ({ settings: stores.appStore.settings }))(
    observer((props: IProps) => {

        const { settings } = props;
        const activeTab = settings.activeTab;
    
    return (
        <div className='settings-container'>
            <Tabs />
            { activeTab === 'chat' && <Chat />}
            { activeTab === 'settings' && <Properties />}
        </div>

    );
    }
    )
)

export default Settings;