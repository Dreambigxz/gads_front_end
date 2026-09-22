import { Injectable, inject } from '@angular/core';
import { QuickNavService } from '../services/quick-nav.service';

@Injectable({ providedIn: 'root' })
export class AppDownloadManager {
  quickNav = inject(QuickNavService);
  installPromptEvent: any = null;
  modal: any;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (this.isIOS() && !this.isInStandaloneMode()) {
      this.quickNav.storeData.set('installIOS', true);
      this.quickNav.storeData.set('device', 'IOS');
      console.log('📱 iOS device detected');
    } else {
      // ✅ Register listener ONCE globally
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault();
        console.log('✅ beforeinstallprompt captured');

        this.installPromptEvent = event;
        this.quickNav.storeData.set('can_download_app', true);
        this.quickNav.storeData.set('device', 'Android');
      });
    }
  }

  isIOS(): boolean {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  isInStandaloneMode(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      ((navigator as any).standalone === true)
    );
  }

  showDownload() {
  }

  installApp() {
    const device = this.quickNav.storeData.get('device');

    if (device === 'IOS') {
      this.openModal();
    } else if (device === 'Android' && this.installPromptEvent) {
      this.installPromptEvent.prompt();

      this.installPromptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          this.quickNav.storeData.set('can_download_app', false);
        }
        this.installPromptEvent = null;
      });
    }
  }

  openModal() {
    const modalEl = document.getElementById('iosPwaModal');
    if (modalEl) {
      this.modal = new (window as any).bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }
}
