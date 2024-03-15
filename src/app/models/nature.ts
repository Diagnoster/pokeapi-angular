export class Nature {
    id: number;
    name: string;
    decreased_stat: string;
    increased_stat: string;

    constructor(id: number, name: string, descreased_stat: string, increased_stat: string) {
        this.id = id;
        this.name = name;
        this.decreased_stat = descreased_stat;
        this.increased_stat = increased_stat;
    }
}
