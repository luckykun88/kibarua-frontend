import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makeTextBold'
})
export class MakeTextBoldPipe implements PipeTransform {

  transform(value: string): string {
    return value.bold();
  }

}
