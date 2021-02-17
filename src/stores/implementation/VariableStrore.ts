import IVariable from '@stores/interface/app/IVariable';
import IVariableCategory from '@stores/interface/app/IVariableCategory';
import { action, observable, computed, reaction } from 'mobx'
import { IVariableStore } from '@stores/interface';

export class VariableStore implements IVariableStore {
    @observable variables: IVariable[] = [];
    @observable constants: IVariableCategory[] = [];

    constructor() {

        reaction(() => {
            return this.variables;
        }, () => {
        })
    }
    getCategory: (name: string) => IVariableCategory;
    getConstants?: IVariableCategory[];


    @action
    getVariable(id: string): IVariable {
        return this.variables.find(item => item.id === id)
    }


    @action
    getConstant(id: string): IVariable {
        let target;
        for (let i = 0; i < this.constants.length; i++) {
            const category = this.constants[i];
            target = category.items.find(item => item.id === id)
            if (target) return target
        }
        return null
    }

    @action
    saveConstant(data: any) {
        const formattedVariables = data.map((category: any) => {
            return {
                ...category,
                items: category.items.map((item: IVariable) => {
                    return {
                        ...item,
                        setName(name: string) {
                            this.name = name;
                        },
                        setType(type: string) {
                            this.type = type;
                        },
                        setValue(value: string) {
                            this.value = value;
                        }
                    }
                })
            }
        })
        this.constants = formattedVariables
    }



    @action
    saveVariable(data: any) {

        const formattedVariables = data.map((item: any) => {
            return {
                ...item,
                setName(name: string) {
                    this.name = name;
                },
                setType(type: string) {
                    this.type = type;
                },
                setValue(value: string) {
                    this.value = value;
                }
            }
        })
        this.variables = formattedVariables


    }







    @action
    writeVariable(type: string, name: string, value: string): void {
        let id = 'var_' + Math.random()
        const variable: IVariable = {
            parent_id: 'cat_0',
            id: id,
            type: 'string',
            name: '',
            value: '',
            setName(name: string) {
                this.name = name;
            },
            setType(type: string) {
                this.type = type;
            },
            setValue(value: any) {
                this.value = value;
            },
        };
        this.variables.push(variable);
    }

    @action
    deleteAllVaribles() {
        this.variables = []
    }

    @action
    deleteVariable(id: string): void {
        this.variables = this.variables.filter(item => item.id !== id)
    }


    @computed
    get activeConstants() {
        return this.constants;
    }

    @computed
    get activeVariables() {
        return this.variables;
    }


}
export const variableStore = new VariableStore()

