import { DoubleDamageFrom } from "./double-damage-from";
import { DoubleDamageTo } from "./double-damage-to";
import { HalfDamageFrom } from "./half-damage-from";
import { HalfDamageTo } from "./half-damage-to";
import { NoDamageFrom } from "./no-damage-from";
import { NoDamageTo } from "./no-damage-to";

export class DamageRelations {
    double_damage_from: DoubleDamageFrom [];
    double_damage_to: DoubleDamageTo [];
    half_damage_from: HalfDamageFrom [];
    half_damage_to: HalfDamageTo [];
    no_damage_from: NoDamageFrom [];
    no_damage_to: NoDamageTo [];

    constructor(
        double_damage_from: DoubleDamageFrom[],
        double_damage_to: DoubleDamageTo[],
        half_damage_from: HalfDamageFrom[],
        half_damage_to: HalfDamageTo[],
        no_damage_from: NoDamageFrom[],
        no_damage_to: NoDamageTo[]
      ) {
        this.double_damage_from = double_damage_from;
        this.double_damage_to = double_damage_to;
        this.half_damage_from = half_damage_from;
        this.half_damage_to = half_damage_to;
        this.no_damage_from = no_damage_from;
        this.no_damage_to = no_damage_to;
      }
}
