import { BaseClass } from "./base/base-class";

export class Abilities {
    is_hidden: boolean;
    slot: number;
    ability: BaseClass;

    constructor(is_hidden: boolean, slot: number, ability: BaseClass) {
        this.is_hidden = is_hidden;
        this.slot = slot;
        this.ability = ability;
    }
}
