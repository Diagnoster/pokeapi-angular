import { BaseClass } from "./base/base-class";

export class DamageRelations {
  constructor(
    public double_damage_from: BaseClass[],
    public double_damage_to: BaseClass[],
    public half_damage_from: BaseClass[],
    public half_damage_to: BaseClass[],
    public no_damage_from: BaseClass[],
    public no_damage_to: BaseClass[]
  ) { }
}
