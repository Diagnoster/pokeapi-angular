import { Abilities } from "./abilities";
import { BaseClass } from "./base/base-class";
import { Moves } from "./moves";
import { Sprites } from "./sprites";
import { Stats } from "./stats";
import { Types } from "./types";

export class Pokemon {
  constructor(
    public id: number, 
    public name: string, 
    public baseExperience: number, 
    public height: number,
    public weight: number, 
    public details: any, 
    public types: Types[], 
    public stats: Stats[], 
    public sprites: Sprites, 
    public url: string, 
    public moves: Moves[], 
    public species: BaseClass, 
    public abilities: Abilities[]
  ) { }
}
