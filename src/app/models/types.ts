import { Type } from "./type";

export class Types {
    slot: number;
    type: Type;

    constructor(slot: number, type: Type) {
        this.slot = slot;
        this.type = type;
    }
}
