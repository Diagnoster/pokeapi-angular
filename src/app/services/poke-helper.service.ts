import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeHelperService {

  constructor() { }

  upperFirstLetter(word: string): string {
    if (this.checkHyphen(word)) {
      word = word.replace(/-/g, ' ');
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  checkHyphen(palavra: string): boolean {
    return palavra.includes('-');
  }
  
  getTypeRetroImageUrl(type: string): string {
    const imagePath = `assets/retro-icons/${type.toLowerCase()}.png`;
    return imagePath;
  }

  getTypeDetailImageUrl(type: string): string {
    const imagePath = `assets/details-icons/${type.toLowerCase()}.png`;
    return imagePath;
  }
  
}
