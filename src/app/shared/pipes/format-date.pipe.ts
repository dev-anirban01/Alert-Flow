import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) return '-';
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleString();
  }
}
