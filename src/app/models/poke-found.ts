export class PokeFound {
    constructor(
        public name: string,
        public url: string,
        public chance: number,
        public method: string,
        public max_level: number,
        public min_level: number,
        public version: string,
        public icon: string
    ) { }
}