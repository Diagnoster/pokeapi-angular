import { DamageRelations } from "./damage-relations";
import { Pokemon } from "./pokemon";

export class TypeRelations {
    id: number;
    damage_relations: DamageRelations ;
    name: string;
    pokemon: Pokemon;

    constructor(id: number, damage_relations: DamageRelations , name: string, pokemon: Pokemon) {
        this.id = id;
        this.damage_relations = damage_relations;
        this.name = name;
        this.pokemon = pokemon;
    }
    
}
