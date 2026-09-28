import {
  CommonModule,
  Location
} from '@angular/common';

import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  QuickNavService
} from '../../reuseables/services/quick-nav.service';
import { ChanagePasswordComponent } from '../../auth/chanage-password/chanage-password.component';

@Component({
  selector: 'app-security-center',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChanagePasswordComponent
  ],
  templateUrl: './security-center.component.html',
  styleUrl: './security-center.component.scss'
})
export class SecurityCenterComponent
  implements OnInit {

  loading = signal(false);
  signingOut = signal(false);

  security: any = {
    activities: [],
    suspicious_activity: false,
    suspicious_count: 0
  };

  constructor(
    public quickNav: QuickNavService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadSecurityCenter();
  }

  loadSecurityCenter(): void {

    this.quickNav.reqServerData
      .get('security-center/')
      .subscribe({
        next: (response: any) => {
          this.security = this.quickNav.storeData.get("security")
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  deviceIcon(activity: any): string {
    if (
      activity.event_type ===
      'registration'
    ) {
      return 'bi-person-plus-fill';
    }

    switch (activity.device_type) {
      case 'mobile':
        return 'bi-phone';

      case 'tablet':
        return 'bi-tablet';

      case 'desktop':
        return 'bi-laptop';

      case 'bot':
        return 'bi-robot';

      default:
        return 'bi-device-ssd';
    }
  }

  activityTitle(activity: any): string {
    if (
      activity.event_type ===
      'registration'
    ) {
      return 'Account registration';
    }

    const browser =
      activity.browser?.split(' ')?.[0] ||
      'Browser';

    const device =
      activity.device_type === 'mobile'
        ? 'Mobile'
        : activity.device_type === 'tablet'
          ? 'Tablet'
          : activity.operating_system
              ?.split(' ')?.[0] ||
            'Device';

    return `${browser} on ${device}`;
  }

  activityStatus(activity: any): string {
    if (activity.is_current) {
      return 'Current';
    }

    if (activity.is_suspicious) {
      return 'Review';
    }

    if (
      activity.event_type ===
      'registration'
    ) {
      return 'Registration';
    }

    return 'Trusted';
  }

  signOutAllDevices(): void {
    if (this.signingOut()) {
      return;
    }

    this.signingOut.set(true);

    this.quickNav.reqServerData
      .post(
        'security-center/sign-out-all/',
        {}
      )
      .subscribe({
        next: () => {
          this.signingOut.set(false);
        },

        error: () => {
          this.signingOut.set(false);
        }
      });
  }
}
