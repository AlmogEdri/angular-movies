import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyEnglish"
})
export class OnlyEnglishPipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    return value.replace(/[^\x00-\x7F]/g, "");
  }
}
