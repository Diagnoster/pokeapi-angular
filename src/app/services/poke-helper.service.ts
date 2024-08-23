import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeHelperService {

  constructor() { }

  upperFirstLetter(word: string, gen?: boolean): string {
    if (this.checkHyphen(word)) {
      word = word.replace(/-/g, ' ');
    }
    const words = word.split(' ');
  
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      if (gen && i === 1) {
        words[i] = words[i].toUpperCase();
      }
    }
    return words.join(' ');
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
