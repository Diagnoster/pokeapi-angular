import { BaseClass } from "./base/base-class";
import { EffectionDescription } from "./effection-description";
import { GameIndices } from "./game-indices";
import { Sprites } from "./sprites";

export class LocationDetails {
    constructor(
        public areas: BaseClass[],
        public game_indices: GameIndices[],
        public id: number,
        public name: string,
        public region: BaseClass
    ) { }
}
