import IStep from './app/IStep'
import IStepToServer from "@stores/interface/helper/IStepToServer";


export default interface IScriptStore {
    script?: IStep[];
    getStep?: (step_id: string) => IStep | null;
    writeStep?: (view: joint.dia.LinkView | joint.dia.ElementView, cell: joint.dia.Cell) => void;
    setStep?: (serverStep: IStepToServer) => void;
    setLink?: (link: joint.dia.Link) => void;
    deleteStep?: (cell: joint.dia.Cell) => void;
    activeStep?: IStep | null;

    readonly getScript?: IStep[] | null;
}