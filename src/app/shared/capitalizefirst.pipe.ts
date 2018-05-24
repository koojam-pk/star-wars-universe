import { Pipe, PipeTransform } from '@angular/core';
/*
 * Source: https://gist.github.com/chl03ks/c7fbd8b7f632f5891e98854b024f0557
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  formats to: Daniel
*/
@Pipe({
  name: 'capitalizefirst'
})
export class CapitalizefirstPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value === null) {
      return 'Not assigned';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
