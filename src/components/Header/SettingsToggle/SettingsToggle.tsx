import React from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IAppStore} from '@stores/interface';
import './SettingsToggle.scss';
import $ from 'jquery';
import {Icon} from '@ui';

type IProps = {
	appStore?: IAppStore;
}

const SettingsToggle = inject((stores: IStores) => ({appStore: stores.appStore}))(
	observer((props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
			const {appStore} = props;
			
			if ($(window).width() < 450) {
				return null;
			} else {
				return (
					<div className={`settings-toggle `} onClick={appStore.settings.toggle}>
						<Icon name={'solid_th-large'}/>
					</div>
				);
			}
		},
	),
);

export default SettingsToggle;
