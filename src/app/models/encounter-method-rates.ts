import { BaseClass } from "./base/base-class";
import { GameIndices } from "./game-indices";
import { VersionDetails } from "./version-details";

export class EncounterMethodRates {
    constructor(
        public encounter_method: BaseClass,
        public version_details: VersionDetails[],
    ) { }
}
