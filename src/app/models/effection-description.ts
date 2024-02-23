import { Language } from "./language";

export class EffectionDescription {
    effect: string;
    short_effect: string;
    language: Language;

    constructor(effect: string, short_effect: string, language: Language) {
        this.effect = effect;
        this.short_effect = short_effect;
        this.language = language;
    }
}
