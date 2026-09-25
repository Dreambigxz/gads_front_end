import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  CryptoAsset,
  CryptoNetwork,
  CryptoSymbol
} from '../wallet.models';

import {
  WalletService
} from '../wallet.service';

@Component({
  selector: 'app-deposit',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss'
})
export class DepositComponent {
  readonly wallet = inject(WalletService);

  readonly selectedAsset =
    signal<CryptoSymbol>('USDT');

  readonly selectedNetworkId =
    signal('');

  readonly addressCopied =
    signal(false);

  readonly activeAsset = computed<
    CryptoAsset | undefined>(() => {
    return this.wallet.getAsset(
      this.selectedAsset()
    );
  });

  readonly activeNetworks = computed(() => {
    return this.activeAsset()?.networks
      .filter(network => network.is_active) ??
      [];
  });

  readonly activeNetwork = computed<
    CryptoNetwork | undefined>(() => {
    const networks =
      this.activeNetworks();

    return networks.find(
      network =>
        network.id ===
        this.selectedNetworkId()
    ) ?? networks[0];
  });


  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: object
  ) {}


  ngOnInit(): void {
    this.wallet.quickNav.reqServerData.get('wallet?start_dir=deposit')
      .subscribe({
        next: (response:any) => {

          const assets = response.main.assets

          this.wallet.initDir(response.main)

          const firstAsset =
            assets?.[0];

          if (!firstAsset) {
            return;
          }

          const usdt = assets.find(
            (asset:any) =>
              asset.symbol === 'USDT'
          );

          const preferredAsset =
            firstAsset ?? usdt;

          this.selectedAsset.set(
            preferredAsset.symbol
          );

          this.selectedNetworkId.set(
            preferredAsset.networks?.[0]
              ?.id ?? ''
          );
        },


      });
  }


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

    this.addressCopied.set(false);
  }


  selectNetwork(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.selectedNetworkId.set(
      select.value
    );

    this.addressCopied.set(false);
  }


  async copyAddress(): Promise<void> {
    const address =
      this.activeNetwork()?.address;

    if (
      !address ||
      !isPlatformBrowser(this.platformId)
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        address
      );

      this.addressCopied.set(true);

      window.setTimeout(
        () => {
          this.addressCopied.set(false);
        },
        2000
      );
    } catch {
      this.wallet.setError(
        'Could not copy wallet address.'
      );
    }
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
