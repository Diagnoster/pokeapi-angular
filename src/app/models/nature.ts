import { BaseClass } from "./base/base-class";

export class Nature {
    constructor(
        public id: number,
        public name: string,
        public decreased_stat: BaseClass,
        public increased_stat: BaseClass
    ) { }
}
