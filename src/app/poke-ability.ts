import { BaseClass } from "./models/base/base-class";
import { Pokemon } from "./models/pokemon";

export class PokeAbility {
    is_hidden: boolean;
    pokemon: BaseClass;

    constructor(is_hidden: boolean, pokemon: Pokemon) {
        this.is_hidden = is_hidden;
        this.pokemon = pokemon;       
    }
}
