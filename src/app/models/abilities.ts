import { Ability } from "./ability";

export class Abilities {
    is_hidden: boolean;
    slot: number;
    ability: Ability;

    constructor(is_hidden: boolean, slot: number, ability: Ability) {
        this.is_hidden = is_hidden;
        this.slot = slot;
        this.ability = ability;
    }
}
