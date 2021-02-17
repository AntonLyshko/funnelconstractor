import { scriptStore, variableStore, chatStore } from '@stores/implementation';
import IStep from '@stores/interface/app/IStep';


class ScriptModel {

    constructor() {

    }


    startScript = () => {
        const { script } = scriptStore;
        let startIndex = script.findIndex(step => step.view_name === 'Блок Старт')
        let step = script[startIndex]
        if (step) {
            let msg = step.view_name
            chatStore.setHistoryItem('start', msg, step.step_id)
            this.nextStep(step.next_step_id)
        }
    }

    nextStep = (step_id: string[]) => {

        if (step_id.length) {
            const { script } = scriptStore;
            let stepIndex = script.findIndex(step => step.step_id === step_id[0])
            let step = script[stepIndex]
            if (step) {
                switch (step.view_name) {
                    case 'Отправить сообщение':
                        this.sendMessage(step)
                        break;
                    case 'Входящее сообщение':
                        this.Input(step)
                        break;
                    case 'Ввод данных':
                        this.Receive(step)
                        break;
                    default:
                        break;
                }
            }
        }
    }


    sendMessage = (step: IStep) => {
        let msg = step.payload.msg;
        let variables = variableStore.activeVariables
        let rawVariabalesArray = step.payload.msg.match(/{(.*?)}/g);
        if (rawVariabalesArray) {
            for (let i = 0; i < rawVariabalesArray.length; i++) {
                let el = rawVariabalesArray[i];
                el = el.match(/{(.+)}/)[1]
                el = variables.find(item => item.name === el)
                msg = msg.replace(rawVariabalesArray[i], el.value)
            }
        }
        chatStore.setHistoryItem('send', msg, step.step_id)
        this.nextStep(step.next_step_id);
    }

    Input = (step: IStep) => {
        chatStore.setHistoryItem('input', '', step.step_id)
        if (step.payload['input']) {
            if (step.payload['variables']) {
                for (let i = 0; i < step.payload['variables'].length; i++) {
                    let el = step.payload['variables'][i];
                    el.setValue(step.payload['input'])
                }
            }
            chatStore.setHistoryItem('input', step.payload['input'], step.step_id)
            this.nextStep(step.next_step_id);
        }
    }

    Receive = (step: IStep) => {
        let msg = step.payload['msg']
        let error = step.payload['error']
        let type;
        if (step.payload['validation_type'] === 'Строка') type = 'string'
        if (step.payload['validation_type'] === 'Число') type = 'number'

        if (step.payload['input']) {
            if (typeof step.payload['input'] === type) {
                chatStore.setHistoryItem('input', step.payload['input'], step.step_id)
                chatStore.setHistoryItem('send', 'Красава', step.step_id)
            } else {
                chatStore.setHistoryItem('input', step.payload['input'], step.step_id)
                chatStore.setHistoryItem('send', error, step.step_id)
            }
        } else {
            chatStore.setHistoryItem('send', msg, step.step_id)
            chatStore.setHistoryItem('input', '', step.step_id)
        }
    }








}

export default ScriptModel;