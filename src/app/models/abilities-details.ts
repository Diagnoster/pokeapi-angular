import { BaseClass } from "./base/base-class";
import { EffectionDescription } from "./effection-description";
import { PokeAbility } from "./poke-ability";

export class AbilitiesDetails {
    id: number;
    effect_entries: EffectionDescription [];
    generation: BaseClass;
    name: string;
    pokemon: PokeAbility [];

    constructor(id: number, name: string, generation: BaseClass, effect_entries : EffectionDescription [], pokemon: PokeAbility[]) {
        this.id = id;
        this.name = name;
        this.generation = generation;
        this.effect_entries = effect_entries;
        this.pokemon = pokemon;
    }
}
