export interface PartInitializerOptions {
    [key: string]: (assemblyData: any, partInitializer: PartInitializer) => any
}

export default class PartInitializer {
    private currentPartIndex: number = 0;
    private readonly parts: PartInitializerOptions;

    constructor(stackHandles: PartInitializerOptions) {
        this.parts = stackHandles;
    }

    getCurrentPart(): string {
        return Object.keys(this.parts)[this.currentPartIndex];
    }

    initPartHandler(assemblyData: any, partInitializer: PartInitializer): string {

        return this.parts[this.getCurrentPart()](assemblyData, partInitializer);
    }

    count(): number {
        return Object.keys(this.parts).length;
    }


    hasNext() {
        return !!Object.keys(this.parts)[this.currentPartIndex + 1];
    }

    hasPrev() {
        return !!Object.keys(this.parts)[this.currentPartIndex - 1];
    }

    next(): boolean {
        this.currentPartIndex++;
        const hasNext = !!this.getCurrentPart();
        if (hasNext) {
            return true;
        } else {
            this.currentPartIndex--;
            return false;
        }
    }

    prev(): boolean {
        this.currentPartIndex--;
        const hasPrev = !!this.getCurrentPart();
        if (hasPrev) {
            return true;
        } else {
            this.currentPartIndex++;
            return false;
        }
    }
}