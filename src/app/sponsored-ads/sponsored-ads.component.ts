import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  HostListener,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import {
  SponsoredAdsModalService
} from './sponsored-ads.service';


@Component({
  selector: 'app-sponsored-ads',
  imports: [
    CommonModule,
  ],
  templateUrl: './sponsored-ads.component.html',
  styleUrl: './sponsored-ads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SponsoredAdsComponent {

  constructor(
    private quickNav: QuickNavService
  ){}

  // @Input()
  // ads: any =[ ]

  @Input()
  loading = false;

  @Output()
  adOpened = new EventEmitter<any>();

  readonly modal =
    inject(SponsoredAdsModalService);


    readonly countdownText =
      signal('Calculating next release...');

    processingAdId: string | null = null;

    private countdownTimer?: number;


    ngOnInit(): void {
      this.updateCountdown();

      this.countdownTimer = window.setInterval(
        () => {
          this.updateCountdown();
        },
        1000
      );
    }


    ngOnDestroy(): void {
      if (this.countdownTimer) {
        window.clearInterval(
          this.countdownTimer
        );
      }
    }


    private updateCountdown(): void {
      const adsData = this.modal.ads();

      const releaseDateValue =
        adsData?.schedule?.next_release_at;

      if (!releaseDateValue) {
        this.countdownText.set(
          'No more releases today'
        );

        return;
      }

      const releaseTime =
        new Date(releaseDateValue).getTime();

      const difference =
        releaseTime - Date.now();

      if (difference <= 0) {
        this.countdownText.set(
          'New tasks are now available'
        );

        return;
      }

      const hours = Math.floor(
        difference / 3_600_000
      );

      const minutes = Math.floor(
        (
          difference % 3_600_000
        ) / 60_000
      );

      const seconds = Math.floor(
        (
          difference % 60_000
        ) / 1000
      );

      if (hours > 0) {
        this.countdownText.set(
          `${hours}h ${minutes}m ${seconds}s remaining`
        );
      } else {
        this.countdownText.set(
          `${minutes}m ${seconds}s remaining`
        );
      }
    }


    getDailyProgress(
      data: any
    ): number {
      if (!data.daily_limit) {
        return 0;
      }

      return Math.min(
        Math.round(
          (
            data.completed_today /
            data.daily_limit
          ) * 100
        ),
        100
      );
    }


  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.modal.isOpen()) {
      this.modal.close();
    }
  }

  closeFromBackdrop(
    event: MouseEvent
  ): void {
    if (
      event.target === event.currentTarget
    ) {
      this.modal.close();
    }
  }

  trackAdOpen(ad:any): void {
    // this.adOpened.emit(ad);

    this.quickNav.openTab(ad.destination_url)

    this.quickNav.reqServerData.post('sponsored-ad-clicked', {ad})
    .subscribe()

  }


  handleImageError(
    event: Event
  ): void {
    const image = event.target as HTMLImageElement;

    image.style.display = 'none';

    const container = image.closest(
      '.sponsored-card__media'
    );

    container?.classList.add(
      'sponsored-card__media--fallback'
    );
  }


  trackByAdId(
    index: number,
    ad: any
  ): string {
    return ad.id;
  }


}
