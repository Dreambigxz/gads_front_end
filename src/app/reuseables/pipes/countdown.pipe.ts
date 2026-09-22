import { Pipe, PipeTransform, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { interval, shareReplay } from 'rxjs';

// import { CountdownService } from './countdown.service';

// 5399 2372 2678 7071

@Injectable({ providedIn: 'root' })
class CountdownService {
  tick$ = interval(1000).pipe(
    shareReplay(1) // 🔥 all pipes share ONE timer
  );
}

@Pipe({
  name: 'countdown',
  standalone: true,
  pure: true // 🔥 VERY IMPORTANT
})
export class CountdownPipe implements PipeTransform {

  private countdownService = inject(CountdownService);

  transform(targetDate: Date | string | number, addHours: number = 0, format: any = 'string', source: any = 0, func : any = null, data: any = null) {

    const checkFunc = (valid_start:any) => {

        if(source==='matches'&&valid_start)func.reload_matches();
      // switch (source) {
      //   case "matches":
      //       if(!valid_start)func.reload_matches();
      //
      //     break;
      //
      //   case "live":
      //       func.getLiveMinute(data)
      //       break
      //
      //   default:
      //     break;
      // }


    }
    const start = new Date(
      typeof targetDate === 'number'
        ? targetDate * 1000
        : typeof targetDate === 'string' && /^\d+$/.test(targetDate)
          ? parseInt(targetDate) * 1000
          : targetDate
    ).getTime();

    const settleAt = addHours ? start + addHours * 3600000 : start;

    return this.countdownService.tick$.pipe(
      map(() => {
        const diff = settleAt - Date.now();

        checkFunc(diff <= 0);

        if (diff <= 0) {
          return null
        }

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (format === 'data') {
          return `${days.toString().padStart(2,'0')}${hours.toString().padStart(2,'0')}${minutes
              .toString().padStart(2,'0')}${seconds.toString().padStart(2,'0')}`;
        }
        else if (format === 'seconds') {
          return totalSeconds; // 🔥 THIS is what we need
        }

        return `${days ? days + 'd ' : ''}${hours}h ${minutes
          .toString()
          .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
      })
    );
  }
}
