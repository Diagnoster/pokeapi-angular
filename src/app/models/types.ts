import { BaseClass } from "./base/base-class";

export class Types {
    slot: number;
    type: BaseClass ;

    constructor(slot: number, type: BaseClass ) {
        this.slot = slot;
        this.type = type;
    }
}
