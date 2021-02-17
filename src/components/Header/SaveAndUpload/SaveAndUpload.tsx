import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IAppStore, IScriptStore} from '@stores/interface';
import {Button, Dropdown, Popover, Tooltip} from 'antd';
import {Icon} from '@ui';
import ErrorPopover from '../ErrorPopover/ErrorPopover';
import $ from 'jquery';

type IProps = {
	appStore?: IAppStore,
	scriptStore?: IScriptStore
}

const SaveAndUpload = inject((stores: IStores) => ({appStore: stores.appStore, scriptStore: stores.scriptStore}))(
	observer((props: IProps) => {
			const {appStore, scriptStore} = props;
			
			const SaveUpload = () => {
				console.log('click');
				appStore.saveAndUpload();
			};
			
			const SaveUploadAndRun = () => {
				appStore.settings.openChat();
				appStore.saveAndUpload();
			};
			
			const SaveToBattle = () => {
				appStore.saveAndUpload();
			};
			
			const StopBot = () => {
				console.log('stop the bot');
			};
			
			const menu = (
					<div className='dropdown-menu-container'>
						<Tooltip placement="left" title={'Обычное сохранение на сервере'}>
							<div onClick={() => SaveUpload()} className="dropdown-menu-item">
								Сохранить
							</div>
						</Tooltip>
						<Tooltip placement="left" title={'Сохранение и запуск тестового бота'}>
							<div onClick={() => SaveUploadAndRun()} className="dropdown-menu-item">
								Сохранить и запустить
							</div>
						</Tooltip>
						<Tooltip placement="left" title={'Сохранение и запуск в продакшн'}>
							<div onClick={() => SaveToBattle()} className="dropdown-menu-item">
								Сохранить и в бой
							</div>
						</Tooltip>
						<Tooltip placement="left" title={'Остановка бота на продакшене'}>
							<div onClick={() => StopBot()} className="dropdown-menu-item">
								Остановить бота
							</div>
						</Tooltip>
					</div>
				
				)
			;
			
			return (
				<div className={`save-upload-container`}>
					{
						scriptStore.script.length !== 0 ? (<Fragment>
							<div className="status">
								{(appStore.uploadStatus.status === 'changed') && (<Fragment>
									<Icon className='icon-s blue' name='solid_dot-circle'/>
									{/*{appStore.uploadStatus.status}*/}
								</Fragment>)}
								
								{(appStore.uploadStatus.status === 'saved') && (<Fragment>
									<Icon className='icon-s green' name='solid_check-circle'/>
									{/*{appStore.uploadStatus.status}*/}
								</Fragment>)}
								
								{(appStore.uploadStatus.status === 'error') && (<Fragment>
									
									{
										Array.isArray(appStore.uploadStatus.data) || $(window).width() < 650 ? (<Fragment>
											<Popover placement="bottom"
											         content={<ErrorPopover errorData={appStore.uploadStatus.data}/>}
											         trigger="click">
												<Button className='transparent'>
													<Icon className='icon-s red' name='solid_times-circle'/>
												</Button>
											</Popover>
										</Fragment>) : (<Fragment>
											<Icon className='icon-s red' name='solid_times-circle'/>
											{appStore.uploadStatus.data}
										</Fragment>)
									}
								</Fragment>)}
							
							</div>
						</Fragment>) : (<Fragment></Fragment>)
					}
					
					<Dropdown.Button type="primary" trigger={['click']}
					                 className={`save-upload-btn `}
					                 onClick={() => SaveUpload()}
					                 overlay={menu}
					                 disabled={scriptStore.script.length === 0}
					>
						Сохранить
					</Dropdown.Button>
				
				</div>
			)
				;
		},
	),
	)
;

export default SaveAndUpload;
