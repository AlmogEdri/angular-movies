import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'MovieTime'})
export class MovieTimePipe implements PipeTransform   {
  transform(value: string, exponent: string): string {
    let temp =parseInt(value);
    const hours = Math.floor(temp / 60);
    const minutes = temp % 60;
    return hours +" h " + minutes + " m";
  }
}