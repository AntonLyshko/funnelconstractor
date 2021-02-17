import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from 'antd';
import Settings from '@components/Settings/Settings';
import {default as IStores, ISidebar} from '@stores/interface';
import './SidebarRightLayout.scss';
import SaveAndUpload from '../../components/Header/SaveAndUpload/SaveAndUpload';
import SettingsToggle from '../../components/Header/SettingsToggle/SettingsToggle';


type TProps = {
	settings?: ISidebar;
}

const SidebarRightLayout = inject((stores: IStores) => ({settings: stores.appStore.settings}))(
	observer((props: TProps) => {
		const {settings} = props;
		
		return (
			<Fragment>
				<Layout.Sider
					className={`sidebar-right-layout  ${settings.isOpen ? 'active' : ''}`}
					collapsedWidth={0}
					width={303}
					collapsible
					collapsed={!settings.isOpen}
					onCollapse={settings.toggle}
				>
					<div className='sidebar-btns'>
						<SaveAndUpload/>
						<SettingsToggle/>
					</div>
					<Settings/>
				</Layout.Sider>
			</Fragment>
		
		);
		
	}),
);

export default SidebarRightLayout;
