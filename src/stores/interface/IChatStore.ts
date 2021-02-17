import IHistory from './app/IHistory'

export default interface IChatStore {
    history?: IHistory[];
    setHistoryItem: (type: string, msg: string, step_id: string) => void;
    clearChat: () => void;
    readonly getHistory: IHistory[] | null;
}
