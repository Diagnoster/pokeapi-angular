import { BaseClass } from "./base/base-class";

export class MoveDetails {
    name: string;
    id: number;
    accuracy: number;
    pp: number;
    power: number;
    type: BaseClass;

    constructor(name: string, id: number, accuracy: number, pp: number, power: number, type: BaseClass) {
        this.name = name;
        this.id = id;
        this.accuracy = accuracy;
        this.pp = pp;
        this.power = power
        this.type = type;
    }
}
