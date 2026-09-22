// how-it-works.service.ts

import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseGuideService {
  private readonly openState = signal(false);

  readonly isOpen = this.openState.asReadonly();

  open(): void {
    this.openState.set(true);
  }

  close(): void {
    this.openState.set(false);
    // window.localStorage.setItem("useGuide","true")
  }

  toggle(): void {
    this.openState.update(value => !value);
  }
}
