import { DamageRelations } from "./damage-relations";
import { Pokemon } from "./pokemon";

export class TypeRelations {
    constructor(
        public id: number,
        public damage_relations: DamageRelations,
        public name: string,
        public pokemon: Pokemon
    ) { }

}
