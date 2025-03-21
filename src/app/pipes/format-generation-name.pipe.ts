import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatGenerationName'
})
export class FormatGenerationNamePipe implements PipeTransform {

  transform(name: string): string {
    if (!name) return '';

    return name
      .replace('generation-', 'gen ')
      .replace('-', ' ')
      .toUpperCase();
  }

}
