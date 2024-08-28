import { BaseClass } from "./base/base-class";
import { EvolutionDetails } from "./evolution-details";

export class EvolutionChain {
    evolution_details: EvolutionDetails[];
    evolves_to: EvolutionChain[];
    is_baby: boolean;
    species: BaseClass;

    constructor(evolution_details: EvolutionDetails[], evolves_to: EvolutionChain[], is_baby: boolean, species: BaseClass) {
        this.evolution_details = evolution_details;
        this.evolves_to = evolves_to;
        this.is_baby = is_baby;
        this.species = species;
    }
}
