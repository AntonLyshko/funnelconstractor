import IVariableCategory from './app/IVariableCategory'
import IVariable from './app/IVariable'


export default interface IVariableStore {
    getVariable: (id: string) => IVariable | null;
    getConstant: (id: string) => IVariable | null;
    saveConstant: (data: any) => void;
    saveVariable: (data: any) => void;
    writeVariable: (type: string, name: string, value: string) => void;
    getCategory: (name: string) => IVariableCategory;
    deleteVariable: (id: string) => void;
    deleteAllVaribles: () => void;
    variables?: IVariable[];
    constants?: IVariableCategory[];
    readonly activeVariables?: IVariable[] | null;
    readonly activeConstants?: IVariableCategory[] | null;
}