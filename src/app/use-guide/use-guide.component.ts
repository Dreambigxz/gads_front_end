import {
  CommonModule,
  DOCUMENT
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  UseGuideService
} from './use-guide.service';

@Component({
  selector: 'app-use-guide',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './use-guide.component.html',
  styleUrl: './use-guide.component.scss'
})
export class UseGuideComponent {

  readonly modal = inject(UseGuideService);

  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(onCleanup => {
      if (!this.modal.isOpen()) {
        return;
      }

      const previousOverflow =
        this.document.body.style.overflow;

      this.document.body.style.overflow = 'hidden';

      onCleanup(() => {
        this.document.body.style.overflow =
          previousOverflow;
      });
    });
  }

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    if (this.modal.isOpen()) {
      this.modal.close();
    }
  }

}
