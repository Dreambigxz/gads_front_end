// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletService } from "../service";
import { HeaderComponent } from "../../components/header/header.component";
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';
import { TimeFormatPipe } from '../../reuseables/pipes/time-format.pipe';

import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  DEMO_TRANSACTIONS,
  TransactionType,
  WalletTransaction
} from './models';


type TypeFilter =
  | 'all'
  | TransactionType;

type AssetFilter =
  | 'all'
  | 'USDT'
  | 'BNB'
  | 'TRX';



@Component({
  selector: 'app-transactions',
  imports: [
    CommonModule,
    HeaderComponent,
    SpinnerComponent,
    CurrencyConverterPipe,
    TimeFormatPipe
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css', "../wallet.component.css"]
  // styleUrls: ['./transactions.component.css', ]
})
export class TransactionsComponent {

  constructor(
      public walletService:WalletService,
      public quickNav:QuickNavService
  ){}

  // transactions: any = []
  //
  // ngOnInit(){
  //
  //   if (!this.quickNav.storeData.get("transactions")) {
  //       this.quickNav.reqServerData.get('wallet?dir=start_transactions').subscribe((res)=>{
  //         this.transactions  =  this.quickNav.storeData.get("transactions")
  //
  //     })}
  // }

  readonly loading = signal(false);

  readonly transactions =
    signal<WalletTransaction[]>([]);

  readonly selectedType =
    signal<TypeFilter>('all');

  readonly selectedAsset =
    signal<AssetFilter>('all');

  readonly selectedTransaction =
    signal<WalletTransaction | null>(null);

  readonly filteredTransactions =
    computed(() => {
      return this.transactions().filter(
        transaction => {
          const typeMatches =
            this.selectedType() === 'all' ||
            transaction.type ===
              this.selectedType();

          const assetMatches =
            this.selectedAsset() === 'all' ||
            transaction.method ===
              this.selectedAsset();

          return (
            typeMatches &&
            assetMatches
          );
        }
      );
    });

  readonly totalDeposited = computed(() => {
    return this.transactions()
      .filter(transaction =>
        transaction.type === 'deposit' &&
        this.isCompleted(transaction)
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );
  });

  readonly totalWithdrawn = computed(() => {
    return this.transactions()
      .filter(transaction =>
        transaction.type === 'withdraw' &&
        this.isCompleted(transaction)
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.init_amount
          ),
        0
      );
  });

  readonly totalActivity = computed(() => {
    return (
      this.totalDeposited() +
      this.totalWithdrawn()
    );
  });


  ngOnInit(): void {
    this.loading.set(true);

    this.walletService.quickNav.reqServerData
      .get(
        'wallet?dir=start_transactions&hideSpinnerimportant'
      )
      .subscribe({
        next: (response: any) => {
          const transactions =
            response?.main?.transactions ??
            response?.main?.transaction ??
            [];

          if (transactions.length) {
            this.transactions.set(
              transactions
            );
          }

          this.loading.set(false);
        },

        error: () => {
          // Keep demo data during frontend work.
          this.loading.set(false);
        }
      });
  }


  setTypeFilter(
    type: TypeFilter
  ): void {
    this.selectedType.set(type);
  }


  setAssetFilter(
    asset: AssetFilter
  ): void {
    this.selectedAsset.set(asset);
  }


  openTransaction(
    transaction: WalletTransaction
  ): void {
    this.selectedTransaction.set(
      transaction
    );
  }


  closeTransaction(): void {
    this.selectedTransaction.set(null);
  }


  isCompleted(
    transaction: WalletTransaction
  ): boolean {
    return (
      transaction.completed ||
      transaction.status === 'success'
    );
  }


  displayStatus(
    transaction: WalletTransaction
  ): string {
    if (this.isCompleted(transaction)) {
      return 'Completed';
    }

    if (transaction.status === 'failed') {
      return 'Failed';
    }

    if (
      transaction.status === 'cancelled'
    ) {
      return 'Cancelled';
    }

    return 'Pending';
  }


  statusClass(
    transaction: WalletTransaction
  ): string {
    if (this.isCompleted(transaction)) {
      return 'completed';
    }

    return transaction.status;
  }


  assetIcon(
    asset: string
  ): string {
    const icons: Record<string, string> = {
      USDT: '₮',
      USD: '₮',
      BNB: '◆',
      TRX: '◈',
      TRON: '◈'
    };

    return icons[asset] ?? '$';
  }


  assetColor(
    asset: string
  ): string {
    const colors: Record<string, string> = {
      USDT: '#16a085',
      USD: '#16a085',
      BNB: '#f3ba2f',
      TRX: '#e91e24',
      TRON: '#e91e24'
    };

    return (
      colors[asset] ??
      'var(--color-secondary)'
    );
  }


  shortHash(
    value: string
  ): string {
    if (!value || value.length <= 16) {
      return value;
    }

    return (
      `${value.slice(0, 8)}...` +
      value.slice(-6)
    );
  }




}
