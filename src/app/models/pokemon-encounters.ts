import { BaseClass } from "./base/base-class";
import { VersionDetails } from "./version-details";

export class PokemonEncounters {
    constructor(
        public pokemon: BaseClass,
        public version_details: VersionDetails[]
    ) { }
}
