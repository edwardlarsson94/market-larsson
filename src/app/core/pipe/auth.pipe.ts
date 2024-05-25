import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auth',
  standalone: true
})
export class AuthPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const atIndex = value.indexOf('@');
    return atIndex !== -1 ? value.substring(0, atIndex) : value;
  }
}
