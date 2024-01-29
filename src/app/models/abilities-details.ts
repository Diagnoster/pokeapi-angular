import { EffectionDescription } from "./effection-description";
import { Generation } from "./generation";

export class AbilitiesDetails {
    id: number;
    effect_entries: EffectionDescription [];
    generation: Generation;
    name: string;

    constructor(id: number, name: string, generation: Generation, effect_entries : EffectionDescription []) {
        this.id = id;
        this.name = name;
        this.generation = generation;
        this.effect_entries = effect_entries;
    }
}
