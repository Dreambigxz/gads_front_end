import {
  DOCUMENT,
  isPlatformBrowser
} from '@angular/common';

import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  public _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  private _loadingButton = new BehaviorSubject<HTMLElement | null>(null);
  public loadingButton$ = this._loadingButton.asObservable();

  public activeButton: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,

    @Inject(PLATFORM_ID)
    private platformId: object
  ) {}

  show() {
    this._loading.next(true);
  }


  hide(): void {
     this._loading.next(false);

   }

  setLoadingButton(button: HTMLElement | null) {
    // 🔁 remove previous button loading state
    if (this.activeButton) {
      this.activeButton.classList.remove('loading');
      this.activeButton.removeAttribute('disabled');
    }


    // ➕ apply to new button
    if (button && button.tagName === 'BUTTON') {
      button.classList.add('loading');
      button.setAttribute('disabled', 'true');
      this.activeButton = button;
    } else {
      this.activeButton = null;
    }

    this._loadingButton.next(button);
  }

  getLoadingButton() {
    return this.loadingButton$;
  }


  private showElement(selector: string): void {
    const elements =
      this.document.querySelectorAll<HTMLElement>(
        selector
      );

      console.log({elements});

    elements.forEach((element) => {
      setTimeout(() => {
        element.style.display = 'block';
        element.style.opacity = '0.5';
        element.style.transition = 'none';
      }, 0);
    });
  }


  private fadeOut(
    selector: string,
    duration = 600
  ): void {
    const elements =
      this.document.querySelectorAll<HTMLElement>(
        selector
      );

    elements.forEach((element) => {
      element.style.transition =
        `opacity ${duration}ms ease`;

      element.style.opacity = '0';

      window.setTimeout(() => {
        element.style.display = 'none';
      }, duration);
    });
  }


}
