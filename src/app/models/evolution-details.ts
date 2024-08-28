import { BaseClass } from "./base/base-class";

export class EvolutionDetails {
    min_level: string;
    item: BaseClass;
    trigger: BaseClass;

    constructor(min_level: string, item: BaseClass, trigger: BaseClass) {
        this.min_level = min_level;
        this.item = item;
        this.trigger = trigger;
        
    }
}
