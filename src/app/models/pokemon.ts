export class Pokemon {
    id: number;
    name: string;
    type: string[];
    height: number;
    weight: number;
    url: string;
    details: any;
  
    constructor(id: number, name: string, type: string[], height: number, weight: number, imageUrl: string, details: any) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.height = height;
      this.weight = weight;
      this.url = imageUrl;
      this.details = details;
    }
}
