import IHistory from '@stores/interface/app/IHistory';
import { action, computed, observable, reaction } from 'mobx'
import { IChatStore } from '@stores/interface';

export class ChatStore implements IChatStore {
    @observable history: IHistory[] = [];

    constructor() {
        reaction(() => {
            return this.history;
        }, () => {

        })
    }

    @action
    setHistoryItem(type: string, msg: string, step_id: string): void {
        let date = new Date()
        let id = 'msg_' + this.history.length
        const historyItem: IHistory = {
            id: id,
            type: type,
            msg: msg,
            step_id: step_id,
            date: date
        };
        this.history.push(historyItem)
    }

    @action
    clearChat(): void {
        this.history = []
    }

    @computed
    get getHistory() {
        return this.history;
    }


}

export const chatStore = new ChatStore()