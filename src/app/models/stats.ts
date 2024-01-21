import { Stat } from "./stat";

export class Stats {
    baseStat: number;
    effort: number;
    stat: Stat;

    constructor(baseStat: number, effort: number, stat: Stat) {
        this.baseStat = baseStat;
        this.effort = effort;
        this.stat = stat;
    }
}
