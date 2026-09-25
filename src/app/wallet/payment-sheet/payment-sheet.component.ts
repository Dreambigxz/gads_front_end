import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletService, PaymentMethod } from "../service";


@Component({
  selector: 'app-payment-sheet',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './payment-sheet.component.html',
  styleUrl: './payment-sheet.component.css'
})
export class PaymentSheetComponent {

  search = '';

  constructor(
    public wallet: WalletService
  ) {}


  filteredPayments(): PaymentMethod[] {

    const methods = this.wallet.selectedTab === 'crypto'
        ? this.wallet.cryptoMethods
        : this.wallet.localMethods;

    if (!this.search.trim()) {

        return methods;

    }

    const keyword = this.search.toLowerCase();

    return methods.filter(item =>

        item.name.toLowerCase().includes(keyword) ||

        item.code.toLowerCase().includes(keyword) ||

        item.subtitle.toLowerCase().includes(keyword)

    );

}

select(item: PaymentMethod) {

    if (this.wallet.selectedTab === 'crypto') {

        this.wallet.selectCrypto(item);

    } else {

        this.wallet.selectLocal(item);

    }

    this.wallet.closeSelector();

}

  isSelected(item: any): boolean {

    if (this.wallet.selectedTab === 'crypto') {

      return this.wallet.selectedCrypto.code === item.code;

    }

    return this.wallet.selectedLocal.code === item.code;

  }
}
