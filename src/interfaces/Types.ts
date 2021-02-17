/** сборка всех интерфейсов, типов не попавших в группы */

export interface PathParams {
    PathX?: number;
    PathY?: number;
    Width?: number;
    Height?: number;
    Radius?: {
        BR?: number;
        TR?: number;
        TL?: number;
        BL?: number;
    }
}

export interface Size {
    width: number,
    height: number
}

export const SERVER_STATUS = {
    PENDING: "pending",
    DONE: "done",
    ERROR: "error"
};
export type TServerStatus = typeof SERVER_STATUS[keyof typeof SERVER_STATUS];

export const ModelShapeType = {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
} as const;

export const ClassShapeType = {
    ACTION: 'action',
    LISTENER: 'listener',
    CONDITION: 'condition',
    SYSTEM: 'system',
} as const;

export const PartType = {
    HEADER: 'header',
    FOOTER: 'footer',
    OPTIONS: 'options',
    BODY: 'body',
    SHADOW: 'shadow',
} as const;