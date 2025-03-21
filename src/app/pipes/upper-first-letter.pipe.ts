import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstLetter'
})
export class UpperFirstLetterPipe implements PipeTransform {

  transform(value: string, gen?: boolean): string {
    if (!value) {
      return '';
    }
    
    if (this.checkHyphen(value)) {
      value = value.replace(/-/g, ' ');
    }
    
    const words = value.split(' ');
  
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      if (gen && i === 1) {
        words[i] = words[i].toUpperCase();
      }
    }
    
    return words.join(' ');
  }

  private checkHyphen(word: string): boolean {
    return word.includes('-');
  }

}
