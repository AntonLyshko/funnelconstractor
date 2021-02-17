import IAppStore from '@stores/interface/app/IAppStore';
import ISidebar from '@stores/interface/app/ISidebar';
import IUser from '@stores/interface/app/IUser';
import ISettings from '@stores/interface/app/ISettings';
import IMenu from '@stores/interface/app/IMenu';
import IMenuAccordion from '@stores/interface/app/IMenuAccordion';
import IVariable from '@stores/interface/app/IVariableCategory';
import IStep from '@stores/interface/app/IStep';
import IVariableStore from '@stores/interface/IVariableStore';
import IServerAction from '@stores/interface/helper/IServerAction';
import IFlowchartStore from '@stores/interface/IFlowchartStore';
import IScriptStore from '@stores/interface/IScriptStore';
import IChatStore from '@stores/interface/IChatStore';

export {
    IFlowchartStore,
    IVariableStore,
    IAppStore,
    ISidebar,
    IUser,
    ISettings,
    IMenu,
    IServerAction,
    IMenuAccordion,
    IVariable,
    IScriptStore,
    IChatStore,
    IStep
};

/** Наименования строго в camelCase, без префикса I */
export default interface IStores {
    flowchartStore: IFlowchartStore;
    variableStore: IVariableStore;
    scriptStore: IScriptStore;
    chatStore: IChatStore;
    appStore: IAppStore;
};

