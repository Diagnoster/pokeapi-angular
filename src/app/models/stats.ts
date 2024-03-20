import { BaseClass } from "./base/base-class";

export class Stats {
    base_stat: number;
    effort: number;
    stat: BaseClass;

    constructor(base_stat: number, effort: number, stat: BaseClass) {
        this.base_stat = base_stat;
        this.effort = effort;
        this.stat = stat;
    }
}
