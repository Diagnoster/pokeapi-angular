import { Stat } from "./stat";

export class Stats {
    base_stat: number;
    effort: number;
    stat: Stat;

    constructor(base_stat: number, effort: number, stat: Stat) {
        this.base_stat = base_stat;
        this.effort = effort;
        this.stat = stat;
    }
}
