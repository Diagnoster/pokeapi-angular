import { Type } from "./type";

export class MoveDetails {
    name: string;
    id: number;
    accuracy: number;
    pp: number;
    power: number;
    type: Type;

    constructor(name: string, id: number, accuracy: number, pp: number, power: number, type: Type) {
        this.name = name;
        this.id = id;
        this.accuracy = accuracy;
        this.pp = pp;
        this.power = power
        this.type = type;
    }
}
