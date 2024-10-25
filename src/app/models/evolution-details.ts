import { BaseClass } from "./base/base-class";

export class EvolutionDetails {
    constructor(
        public min_level: string,
        public item: BaseClass,
        public trigger: BaseClass
    ) { }
}
