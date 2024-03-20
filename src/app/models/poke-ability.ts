import { BaseClass } from "./base/base-class";

export class PokeAbility {
    is_hidden: boolean;
    pokemon: BaseClass;

    constructor(is_hidden: boolean, pokemon: BaseClass) {
        this.is_hidden = is_hidden;
        this.pokemon = pokemon;       
    }
}
