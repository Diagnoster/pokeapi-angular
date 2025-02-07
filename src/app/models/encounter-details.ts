import { BaseClass } from "./base/base-class";

export class EncounterDetails {
    constructor(
        public chance: number,
        public max_level: number,
        public method: BaseClass,
        public min_level: number,
    ) { }
}
