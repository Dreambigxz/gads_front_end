import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';
import { JoinComponent  } from "./join/join.component";
import { LoginComponent  } from "./login/login.component";
import { ResetComponent  } from "./reset/reset.component";

import { AuthService } from '../reuseables/auth/auth.service';
import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import {  Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    JoinComponent,
    LoginComponent,
    SpinnerComponent,
    ResetComponent

  ],
  templateUrl: './auth.component.html',
  styleUrl:'./auth.component.css'
  // styleUrls: ['./auth.component.css', "./auth.scss"]
})
export class AuthComponent {

  constructor(
    public authService: AuthService,
    public quickNav: QuickNavService,
    public router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    )
    .subscribe(() => {

      const url = this.router.url.split('#')[0];

      if (!url.includes('/auth')) return;

      if (this.authService.checkLogin()) {

        this.quickNav.go("/")
        return
      }
      this.authService.setRefCode();
      this.callBackSocialAuth()

    });

  }

  callBackSocialAuth() {
    const provider = this.route.snapshot.queryParamMap.get('callback'); // e.g. "google" or "facebook"
    const code = this.route.snapshot.queryParamMap.get('code');
    const payload = {code, RefCode:this.authService.RefCode}

    if (code && provider) {

      const social_url = `auth/${provider}/`;

      this.authService.reqServerData.post(social_url, payload).subscribe({
        next: (res:any) => {

          if (res.key) {
            this.authService.login(res.key, this.authService.mode)

          }
        },
        error: (err) => {
          console.error('OAuth error:', err);
          // this.router.navigate(['/login']);
        }
      });
    }
  }

}
