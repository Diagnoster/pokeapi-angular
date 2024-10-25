import { EffectionDescription } from "./effection-description";
import { Sprites } from "./sprites";

export class ItemDetails {
    constructor(
        public id: number,
        public name: string,
        public cost: number,
        public effect_entries: EffectionDescription[],
        public sprites: Sprites
    ) { }
}
