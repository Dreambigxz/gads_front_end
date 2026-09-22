// src/app/reuseables/pipes/time-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(
    timestamp: number | string | Date,
    format:
      | 'time'
      | 'date'
      | 'fullDate'
      | 'day'
      | 'shortDate'
      | 'week_day' = 'time'
  ): string {

    if (!timestamp) return '';

    const now = new Date();

    const date =
      typeof timestamp === 'number'
        ? new Date(timestamp * 1000)
        : typeof timestamp === 'string'
          ? new Date(timestamp)
          : timestamp;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {};

    switch (format) {

      case 'time':
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = true;
        break;

      case 'date':
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
        break;

      case 'day': {

        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        const target = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        const diffDays = Math.round(
          (target.getTime() - today.getTime()) / 86400000
        );

        if (diffDays === 0) return 'Today';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays === 1) return 'Tomorrow';

        options.weekday = 'long';

        break;
      }

      case 'week_day':
        options.weekday = 'short';
        break;

      case 'shortDate':
        options.day = '2-digit';
        options.month = '2-digit';
        break;

      case 'fullDate':
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = true;
        break;
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
