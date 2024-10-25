import { BaseClass } from "./base/base-class";

export class Abilities {
    constructor(
        public is_hidden: boolean,
        public slot: number,
        public ability: BaseClass
    ) { }
}
