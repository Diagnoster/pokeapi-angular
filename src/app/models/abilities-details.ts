import { BaseClass } from "./base/base-class";
import { EffectionDescription } from "./effection-description";
import { PokeAbility } from "./poke-ability";

export class AbilitiesDetails {
    constructor(
        public id: number,
        public name: string,
        public generation: BaseClass,
        public effect_entries: EffectionDescription[],
        public pokemon: PokeAbility[]
    ) { }
}
