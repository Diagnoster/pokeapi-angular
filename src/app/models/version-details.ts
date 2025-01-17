import { BaseClass } from "./base/base-class";
import { EncounterDetails } from "./encounter-details";

export class VersionDetails {
    constructor(
        public encounter_details: EncounterDetails[],
        public max_chance: number,
        public version: BaseClass,
    ) { }
}
