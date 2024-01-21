import { Sprites } from "./sprites";
import { Stat } from "./stat";
import { Types } from "./types";

export class Pokemon {
    id: number;
    name: string;
    baseExperience: number;
    height: number;
    weight: number;
    details: any;
    types: Types [];
    stats: Stat [];
    sprites: Sprites;
    url: string;
  
    constructor(id: number, name: string, baseExperience: number, height: number, 
      weight: number, details: any, types: Types[], stats: Stat [], sprites: Sprites, url: string) {
      this.id = id;
      this.name = name;
      this.baseExperience = baseExperience;
      this.height = height;
      this.weight = weight;
      this.details = details;
      this.types = types;
      this.stats = stats;
      this.sprites = sprites;
      this.url = url;
    }
}
