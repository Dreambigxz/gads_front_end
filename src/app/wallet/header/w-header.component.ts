import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletService } from "../service";
import { PaymentSheetComponent } from "../payment-sheet/payment-sheet.component";

// import { QuickNavService } from '../../reuseables/services/quick-nav.service';

@Component({
  selector: 'app-wallet-header',
  imports: [
    CommonModule,
    PaymentSheetComponent
  ],
  templateUrl: './w-header.component.html',
  styleUrl: './w-header.component.css'
})
export class WalletHeaderComponent {

  @Input() title='Deposit';

   @Input() subtitle='Choose a payment method';


   constructor(
       public wallet:WalletService,
       // public quickNav:QuickNavService
   ){}


   get selectedTab() {

      return this.wallet.selectedTab;

  }

  get payment() {

      return this.selectedTab === 'crypto'

          ? this.wallet.selectedCrypto

          : this.wallet.selectedLocal;

  }

  changeTab(tab: 'crypto' | 'local') {

      this.wallet.changeTab(tab);

  }




}
