import { BaseClass } from "./base/base-class";

export class MoveDetails {
    constructor(
        public name: string,
        public id: number,
        public accuracy: number,
        public pp: number,
        public power: number,
        public type: BaseClass,
        public generation: BaseClass,
        public damage_class: BaseClass
    ) { }
}
