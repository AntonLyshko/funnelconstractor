import IMenu from '@stores/interface/app/IMenu'
import ISettings from '@stores/interface/app/ISettings'
import IUser from '@stores/interface/app/IUser'
import IServerAction from '@stores/interface/helper/IServerAction'


export default interface IAppStore extends IServerAction {
	uploadStatus: any;
	page404: boolean
	menu: IMenu;
	settings: ISettings;
	/** Здесь буду хранить данные пользователя */
	user: IUser;
	funnelId: string | number;
	/** Все запросы в АПИ начальные (лучше 1 со всеми начальными данными)*/
	initialization: () => void;
	saveAndUpload: () => void;
}
