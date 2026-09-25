import {
  Injectable,
  signal
} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SponsoredAdsModalService {

  readonly isOpen = signal(false);
  readonly loading = signal(false);
  readonly ads = signal<any>({});

  readonly dailyLimit = signal(0);
  readonly completedToday = signal(0);
  readonly remainingToday = signal(0);


  open(
    ads?: any[]
  ): void {
    if (ads) {
      this.ads.set(ads);
    }

    this.isOpen.set(true);
    document.body.classList.add(
      'modal-open'
    );
  }


  close(): void {
    this.isOpen.set(false);
    document.body.classList.remove(
      'modal-open'
    );
  }


  setAds(
    ads: any[]
  ): void {
    this.ads.set(ads);
  }


  setLoading(
    loading: boolean
  ): void {
    this.loading.set(loading);
  }


  setProgress(data: {
    daily_limit?: number;
    completed_today?: number;
    remaining_today?: number;
  }): void {
    this.dailyLimit.set(
      data.daily_limit ?? 0
    );

    this.completedToday.set(
      data.completed_today ?? 0
    );

    this.remainingToday.set(
      data.remaining_today ?? 0
    );
  }


  // removeCompletedAd(
  //   impressionId: string
  // ): void {
  //   this.ads.update(ads =>
  //     ads.filter(
  //       ad => ad.id !== impressionId
  //     )
  //   );
  //
  //   this.completedToday.update(
  //     value => value + 1
  //   );
  //
  //   this.remainingToday.update(
  //     value => Math.max(value - 1, 0)
  //   );
  // }
}
