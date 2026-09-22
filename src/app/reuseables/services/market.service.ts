import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,throwError } from 'rxjs';

import { RequestDataService } from '../http-loader/request-data.service';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  // baseUrl = 'http://127.0.0.1:8000/api';
  baseUrl = '/api'

  constructor(
    private http: HttpClient,
    private reqServerData: RequestDataService,

  ) {}

  getMarketData(spinner:any="hideSpinner") {
    return this.http
      .get<any[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&'+spinner)
      .pipe(
        timeout(15000), // 15 seconds
        map(data =>
          data.filter(c =>
            ['btc','eth','ltc','sol','dot','fil','doge','xrp', 'trx', 'ada', 'link', 'atom', 'xaut']
            .includes(c.symbol)
          )
        )
      );
  }

  getSparkline(symbol: string) {
    return this.http
    .get<any[]>(`https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`)
    .pipe(
      timeout(20000), // 20 seconds for POST
      catchError(err => {
        if (err.name === 'TimeoutError') {
          console.error('POST request timed out');
        }
        return throwError(() => err);
      })
    );
  }

  getCandles(symbol:string, interval:string) {
    // rty
    return this.http
    .get<any[]>(`${this.baseUrl}/candles?symbol=${symbol}&interval=${interval}`)
    .pipe(
      timeout(20000), // 20 seconds for POST
      catchError(err => {
        if (err.name === 'TimeoutError') {
          console.error('POST request timed out');
        }
        return throwError(() => err);
      })
    );

  }


}
