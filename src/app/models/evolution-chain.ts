import { BaseClass } from "./base/base-class";
import { EvolutionDetails } from "./evolution-details";

export class EvolutionChain {
    constructor(
        public evolution_details: EvolutionDetails[],
        public evolves_to: EvolutionChain[],
        public is_baby: boolean,
        public species: BaseClass
    ) { }
}
