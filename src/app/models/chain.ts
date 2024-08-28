import { BaseClass } from "./base/base-class";
import { EvolutionChain } from "./evolution-chain";
import { EvolutionDetails } from "./evolution-details";

export class Chain {
    species: BaseClass;
    is_baby: boolean;
    evolution_details: EvolutionDetails[];
    evolves_to: EvolutionChain[];
  
    constructor(
      species: { name: string; url: string },
      is_baby: boolean,
      evolution_details: EvolutionDetails[],
      evolves_to: EvolutionChain[],
    ) {
      this.species = species;
      this.is_baby = is_baby;
      this.evolution_details = evolution_details;
      this.evolves_to = evolves_to;
    }
  }