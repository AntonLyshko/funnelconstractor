import {action, observable} from 'mobx';

import IServerAction from "@stores/interface/helper/IServerAction";
import {SERVER_STATUS, TServerStatus} from "@interfaces/Types";

export default class CServerAction implements IServerAction {

    @observable  status: TServerStatus;

    get isPending() {
        return this.status === SERVER_STATUS.PENDING;
    }

    get isDone() {
        return this.status === SERVER_STATUS.DONE;
    }

    get isError() {
        return this.status === SERVER_STATUS.ERROR;
    }

    @action.bound
    protected pending() {
        this.status = SERVER_STATUS.PENDING;
    };

    @action.bound
    protected done() {
        this.status = SERVER_STATUS.DONE;
    };

    @action.bound
    protected error() {
        this.status = SERVER_STATUS.ERROR;
    };

}
