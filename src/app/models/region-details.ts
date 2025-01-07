import { BaseClass } from "./base/base-class";

export class RegionDetails {
      constructor(
        public id: number,
        public name: string,
        public url: string,
        public img: string,
        public main_generation: BaseClass,
        public pokedexes: BaseClass [],
        public version_groups: BaseClass [],
        public locations: BaseClass [],
        public description: any,
        public introduction: string
      ) { }
}
