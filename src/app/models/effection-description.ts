import { Language } from "./language";

export class EffectionDescription {
    effect: string;
    language: Language;

    constructor(effect: string, language: Language) {
        this.effect = effect;
        this.language = language;
    }
}
