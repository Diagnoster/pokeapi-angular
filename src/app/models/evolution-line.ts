export class EvolutionLine {
    pokeImage: string;
    lvlUp?: number | null;
    item: string;
    trigger: string;
    name: string;

    constructor(pokeImage: string, lvlUp: number | null, item: string, trigger: string, name: string) {
        this.pokeImage = pokeImage;
        this.lvlUp = lvlUp;
        this.item = item;
        this.trigger = trigger;
        this.name = name;
    }
}
