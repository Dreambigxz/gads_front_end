import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable,
  delay,
  finalize,
  tap,
  of
} from 'rxjs';

import {
  CryptoAsset,
  CryptoNetwork,
  CryptoSymbol,
  DepositPageResponse,
  TransactionFilters,
  WalletBalance,
  WalletTransaction,
  WithdrawalPayload
} from './wallet.models';

import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed

let DATA = {

  balance: {
    balance: '1250.00',
    currency: 'USD'
  },

  assets: [
    {
      symbol: 'USDT',
      name: 'Tether',
      color: '#16a085',
      icon: null,

      networks: [
        {
          id: 'usdt-trc20',
          name: 'TRC20',
          display_name: 'TRON (TRC20)',
          symbol: 'USDT',

          // Demonstration address only.
          address:
            'TDemoUSDT9Kf32Lm8Qx7P2Za',

          qr_code_url: null,

          minimum_deposit: '10.00',
          confirmations: 1,

          warning:
            'Send only USDT through the TRC20 network. Sending another asset or using another network may result in permanent loss.',

          is_active: true
        },

        // {
        //   id: 'usdt-bep20',
        //   name: 'BEP20',
        //   display_name: 'BNB Smart Chain (BEP20)',
        //   symbol: 'USDT',
        //
        //   // Demonstration address only.
        //   address:
        //     '0xDemoUSDTBep20A8F3D922E',
        //
        //   qr_code_url: null,
        //
        //   minimum_deposit: '5.00',
        //   confirmations: 12,
        //
        //   warning:
        //     'Send only USDT through the BEP20 network. Do not send native BNB to this address.',
        //
        //   is_active: true
        // }
      ]
    },

    {
      symbol: 'BNB',
      name: 'BNB',
      color: '#f3ba2f',
      icon: null,

      networks: [
        {
          id: 'bnb-bep20',
          name: 'BEP20',
          display_name: 'BNB Smart Chain (BEP20)',
          symbol: 'BNB',

          // Demonstration address only.
          address:
            '0xDemoBNB58A3C29172F10D',

          qr_code_url: null,

          minimum_deposit: '0.01',
          confirmations: 12,

          warning:
            'Send only BNB through the BEP20 network. Make sure the selected network matches the sending wallet.',

          is_active: true
        }
      ]
    },

    {
      symbol: 'TRX',
      name: 'TRON',
      color: '#e91e24',
      icon: null,

      networks: [
        {
          id: 'trx-trc20',
          name: 'TRC20',
          display_name: 'TRON (TRC20)',
          symbol: 'TRX',

          // Demonstration address only.
          address:
            'TDemoTRX4Lm92ZaP8Qx63Nk',

          qr_code_url: null,

          minimum_deposit: '10.00',
          confirmations: 1,

          warning:
            'Send only TRX through the TRON network. Deposits sent through unsupported networks cannot be recovered.',

          is_active: true
        }
      ]
    }
  ],

  recent_deposits: [
    // {
    //   id: 'deposit-demo-001',
    //   type: 'deposit',
    //   asset: 'USDT',
    //   network: 'TRC20',
    //   amount: '100.00',
    //   status: 'completed',
    //
    //   transaction_hash:
    //     '0x3f2a9741d9c49ca8',
    //
    //   created_at:
    //     '2026-09-25T01:42:00+01:00'
    // },
    //
    // {
    //   id: 'deposit-demo-002',
    //   type: 'deposit',
    //   asset: 'BNB',
    //   network: 'BEP20',
    //   amount: '0.50',
    //   status: 'pending',
    //
    //   transaction_hash:
    //     '0x8e4b88271f96da21',
    //
    //   created_at:
    //     '2026-09-24T18:20:00+01:00'
    // },
    //
    // {
    //   id: 'deposit-demo-003',
    //   type: 'deposit',
    //   asset: 'TRX',
    //   network: 'TRC20',
    //   amount: '250.00',
    //   status: 'completed',
    //
    //   transaction_hash:
    //     '0x6a9d310b2c3e824b',
    //
    //   created_at:
    //     '2026-09-23T14:15:00+01:00'
    // }
  ]
};


@Injectable({
  providedIn: 'root'
})
export class WalletService {


  private readonly useMockData = true;

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    `/wallet`;

  readonly loading = signal(false);
  readonly processing = signal(false);
  readonly error = signal<string | null>(null);

  readonly balance = signal<WalletBalance>({
    balance: '0.00',
    currency: 'USD'
  });

  readonly assets = signal<CryptoAsset[]>([]);

  readonly recentDeposits =
    signal<WalletTransaction[]>([]);

  readonly transactions =
    signal<WalletTransaction[]>([]);

  readonly totalDeposited = computed(() => {
    return this.transactions()
      .filter(item =>
        item.type === 'deposit' &&
        item.status === 'completed'
      )
      .reduce(
        (total, item) =>
          total + Number(item.amount),
        0
      );
  });

  readonly totalWithdrawn = computed(() => {
    return this.transactions()
      .filter(item =>
        item.type === 'withdrawal' &&
        item.status === 'completed'
      )
      .reduce(
        (total, item) =>
          total + Number(item.amount),
        0
      );
  });

  Data = DATA

  constructor(
    public quickNav: QuickNavService,
  ){}


  initDir(response:any){
    this.assets.set(
        response.assets ?? []
      );
  }

  
  loadTransactions(
    filters: TransactionFilters = {}
  ): Observable<WalletTransaction[]> {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();

    if (
      filters.type &&
      filters.type !== 'all'
    ) {
      params = params.set(
        'type',
        filters.type
      );
    }

    if (
      filters.asset &&
      filters.asset !== 'all'
    ) {
      params = params.set(
        'asset',
        filters.asset
      );
    }

    if (filters.page) {
      params = params.set(
        'page',
        filters.page
      );
    }

    return this.http
      .get<WalletTransaction[]>(
        `${this.apiUrl}/transactions/`,
        { params }
      )
      .pipe(
        tap(transactions => {
          this.transactions.set(
            transactions ?? []
          );
        }),

        finalize(() => {
          this.loading.set(false);
        })
      );
  }


  createWithdrawal(
    payload: WithdrawalPayload
  ): Observable<WalletTransaction> {
    this.processing.set(true);
    this.error.set(null);

    return this.http
      .post<WalletTransaction>(
        `${this.apiUrl}/withdraw/`,
        payload
      )
      .pipe(
        tap(transaction => {
          this.transactions.update(items => [
            transaction,
            ...items
          ]);
        }),

        finalize(() => {
          this.processing.set(false);
        })
      );
  }


  getAsset(
    symbol: CryptoSymbol
  ): CryptoAsset | undefined {
    return this.assets().find(
      asset => asset.symbol === symbol
    );
  }


  getNetwork(
    assetSymbol: CryptoSymbol,
    networkId: string
  ): CryptoNetwork | undefined {
    return this.getAsset(
      assetSymbol
    )?.networks.find(
      network => network.id === networkId
    );
  }


  setError(
    message: string | null
  ): void {
    this.error.set(message);
  }
}
