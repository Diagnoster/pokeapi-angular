import { OfficialArtwork } from "./official-artwork";

export class Sprites {
    default: string;
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    official_artwork: OfficialArtwork;

    constructor(back_default: string, back_shiny: string, front_default: string, front_shiny: string, official_artwork: OfficialArtwork, defaultSprite: string) {
        this.back_default = back_default;
        this.back_shiny = back_shiny;
        this.front_default = front_default;
        this.front_shiny = front_shiny;
        this.official_artwork = official_artwork;
        this.default = defaultSprite;
    }
}
