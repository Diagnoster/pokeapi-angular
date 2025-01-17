import { BaseClass } from "./base/base-class";
import { EncounterMethodRates } from "./encounter-method-rates";
import { PokemonEncounters } from "./pokemon-encounters";

export class LocationArea {
    constructor(
        public encounter_method_rates: EncounterMethodRates[],
        public game_index: number,
        public id: number,
        public location: BaseClass,
        public name: string,
        public region: BaseClass,
        public pokemon_encounters: PokemonEncounters[]
    ) { }
}
