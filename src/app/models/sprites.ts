import { OfficialArtwork } from "./official-artwork";

export class Sprites {
    constructor(
        public back_default: string,
        public back_shiny: string,
        public front_default: string,
        public front_shiny: string,
        public official_artwork: OfficialArtwork,
        public defaultSprite: string
    ) { }
}
