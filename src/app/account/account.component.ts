import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MobileMenuComponent } from "../components/mobile-menu/mobile-menu.component";
import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import { LanguageComponent } from '../reuseables/modals/language/language.component'; // ✅ adjust path as needed
import { ChanagePasswordComponent } from '../auth/chanage-password/chanage-password.component';

import { UseGuideService } from "../use-guide/use-guide.service";
import { UseGuideComponent } from "../use-guide/use-guide.component";

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    RouterLink,
    MobileMenuComponent,
    LanguageComponent,
    ChanagePasswordComponent,
    UseGuideComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  constructor(
    public quickNav:  QuickNavService,
    public useGuide: UseGuideService
  ){}

  user: any = {
   username: 'Alex Morgan',
   email: 'alex@example.com',
   avatar: null,
   active: true,
   referral_code: '0A7C610',
   balance: 245.80,
   total_earned: 0,
   currency: 'USD',
   language: 'English'
 };

  notificationsEnabled = true;
   ngOnInit(){

     if (!this.quickNav.storeData.get('plan_summary')) {
       this.quickNav.reqServerData.get('get-data?req=plan_summary&')
       .subscribe()
     }
   }

   copyReferralCode(): void {
     navigator.clipboard.writeText(
       this.user.referral_code
     );
   }

   toggleNotifications(): void {
     this.notificationsEnabled =
       !this.notificationsEnabled;
   }

   openLanguageModal(): void {
     this.quickNav.languageModalOpen = true;
   }


}
