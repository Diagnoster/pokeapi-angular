import { BaseClass } from "./base/base-class";

export class EffectionDescription {
    effect: string;
    short_effect: string;
    language: BaseClass;

    constructor(effect: string, short_effect: string, language: BaseClass) {
        this.effect = effect;
        this.short_effect = short_effect;
        this.language = language;
    }
}
