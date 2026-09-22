import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../app/reuseables/modals/confirmation-dialog/confirmation-dialog.component';
import { QuickMessageComponent } from '../app/reuseables/modals/quick-message/quick-message.component';
import { MessageComponent } from '../app/reuseables/modals/message/message.component';
import { SuccessCheckComponent } from '../app/reuseables/success-check/success-check.component';
import { SpinnerComponent } from '../app/reuseables/http-loader/spinner.component';
// import { QuickNavService } from '../app/reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import { AuthService } from '../app/reuseables/auth/auth.service';
import { UseGuideComponent } from "../app/use-guide/use-guide.component";

import {
  RankingComponent,
} from './articles/ranking/ranking.component';
import {
  DOCUMENT,
  isPlatformBrowser
} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    SpinnerComponent,
    ConfirmationComponent,
    QuickMessageComponent,
    MessageComponent,
    SuccessCheckComponent,
    RankingComponent,
    UseGuideComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'g-ads';

  constructor(
    private authService: AuthService,

    @Inject(DOCUMENT)
    private document: Document,

    @Inject(PLATFORM_ID)
    private platformId: object
  ){}

  ngOnInit(){
      if (!isPlatformBrowser(this.platformId)) return;
      if (!this.authService.checkLogin()){//||['/plan/activation', "/auth"].includes(window.location.pathname)) {
        this.fadeOut('.se-pre-con');
      }
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
