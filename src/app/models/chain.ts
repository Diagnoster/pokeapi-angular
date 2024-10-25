import { BaseClass } from "./base/base-class";
import { EvolutionChain } from "./evolution-chain";
import { EvolutionDetails } from "./evolution-details";

export class Chain {
    constructor(
        public species: { name: string; url: string },
        public is_baby: boolean,
        public evolution_details: EvolutionDetails[],
        public evolves_to: EvolutionChain[],
    ) { }
}