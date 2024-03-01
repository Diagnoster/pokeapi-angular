export class BattleStats {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;

    constructor(hp: number, attack: number, defense: number, special_attack: number, special_defense: number, speed: number) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.special_attack = special_attack;
        this.special_defense = special_defense;
        this.speed = speed;
    }
}
