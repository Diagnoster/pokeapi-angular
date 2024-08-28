export class EvolutionLine {
    pokeImage: string;
    lvlUp: string;
    item: string;
    trigger: string;


    constructor(pokeImage: string, lvlUp: string, item: string, trigger: string) {
        this.pokeImage = pokeImage;
        this.lvlUp = lvlUp;
        this.item = item;
        this.trigger = trigger;
    }
}
