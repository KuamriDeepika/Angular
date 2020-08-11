import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToCustomPipe'
})
export class ConvertToCustomPipe implements PipeTransform{
    transform(value: string, character: string): string {
       return value.replace(character, ' ');
    }

}
