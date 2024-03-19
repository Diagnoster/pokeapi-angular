import { BaseClass } from "./base/base-class";

export class Nature {
    id: number;
    name: string;
    decreased_stat: BaseClass;
    increased_stat: BaseClass;

    constructor(id: number, name: string, descreased_stat: BaseClass, increased_stat: BaseClass) {
        this.id = id;
        this.name = name;
        this.decreased_stat = descreased_stat;
        this.increased_stat = increased_stat;
    }
}
