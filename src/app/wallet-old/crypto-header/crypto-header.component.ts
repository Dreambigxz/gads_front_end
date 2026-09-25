import { Component } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  CryptoAsset,
  CryptoSymbol
} from '../../models/wallet.models';

@Component({
  selector: 'app-crypto-header',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './crypto-header.component.html',
  styleUrl: './crypto-header.component.scss'
})
export class CryptoHeaderComponent {

  readonly mode = input<
    'deposit' | 'withdrawal'
  >('deposit');

  readonly title = input('Crypto Wallet');

  readonly balance = input(0);

  readonly currency = input('USD');

  readonly assets =
    input<CryptoAsset[]>([]);

  readonly selectedAsset =
    model<CryptoSymbol>('USDT');

  readonly selectedNetworkId =
    model<string>('');

  readonly activeAsset = computed(() => {
    return this.assets().find(
      asset =>
        asset.symbol ===
        this.selectedAsset()
    );
  });

  readonly availableNetworks =
    computed(() => {
      return (
        this.activeAsset()
          ?.networks
          ?.filter(
            network => network.is_active
          ) ?? []
      );
    });


  selectAsset(
    asset: CryptoAsset
  ): void {
    this.selectedAsset.set(
      asset.symbol
    );

    const firstNetwork =
      asset.networks.find(
        network => network.is_active
      );

    this.selectedNetworkId.set(
      firstNetwork?.id ?? ''
    );
  }


  selectNetwork(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.selectedNetworkId.set(
      select.value
    );
  }


  assetIcon(
    symbol: CryptoSymbol
  ): string {
    const icons: Record<
      CryptoSymbol,
      string
    > = {
      USDT: '₮',
      BNB: '◆',
      TRX: '◈'
    };

    return icons[symbol];
  }
  

}
