import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeHelperService {

  constructor() { }
  
  checkHyphen(palavra: string): boolean {
    if (typeof palavra !== 'string') {
      return false;
    }
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
