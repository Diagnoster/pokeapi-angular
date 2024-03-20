import { BaseClass } from "./base/base-class";

export class DamageRelations {
    double_damage_from: BaseClass [];
    double_damage_to: BaseClass [];
    half_damage_from: BaseClass [];
    half_damage_to: BaseClass [];
    no_damage_from: BaseClass [];
    no_damage_to: BaseClass [];

    constructor(
        double_damage_from: BaseClass[],
        double_damage_to: BaseClass[],
        half_damage_from: BaseClass[],
        half_damage_to: BaseClass[],
        no_damage_from: BaseClass[],
        no_damage_to: BaseClass[]
      ) {
        this.double_damage_from = double_damage_from;
        this.double_damage_to = double_damage_to;
        this.half_damage_from = half_damage_from;
        this.half_damage_to = half_damage_to;
        this.no_damage_from = no_damage_from;
        this.no_damage_to = no_damage_to;
      }
}
