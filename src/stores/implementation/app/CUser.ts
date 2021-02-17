import {observable} from 'mobx';

import {IUser} from '@stores/interface';

export default class CUser implements IUser {
    @observable name: string;
    @observable avatar: any;
}
