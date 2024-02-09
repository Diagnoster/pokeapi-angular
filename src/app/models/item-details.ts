import { EffectionDescription } from "./effection-description";
import { Sprites } from "./sprites";

export class ItemDetails {
    id: number;
    name: string;
    cost: number;
    effect_entries: EffectionDescription [];
    sprites: Sprites;

    constructor(id: number, name: string, cost: number, effect_entries: EffectionDescription [], sprites: Sprites) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.effect_entries = effect_entries;
        this.sprites = sprites;
    }
}
