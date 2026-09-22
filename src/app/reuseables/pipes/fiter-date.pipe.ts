import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'txFilter' })
export class TxFilterPipe implements PipeTransform {
  transform(txs: any[], search: string, start: string, end: string) {
    if (!txs) return [];

    let filtered = txs;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(tx =>
        (tx.transactionID || tx.sessionID).toLowerCase().includes(q) ||
        tx.method.toLowerCase().includes(q)
      );
    }

    if (start) {
      filtered = filtered.filter(tx =>
        new Date(tx.timestamp) >= new Date(start)
      );
    }
    if (end) {
      filtered = filtered.filter(tx =>
        new Date(tx.timestamp) <= new Date(end)
      );
    }

    return filtered;
  }
}
