import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncateCenterPipe } from '../../reuseables/pipes/truncate-center.pipe';

import { WalletHeaderComponent } from "../header/w-header.component";
import { WalletService } from "../service";
import { HeaderComponent } from "../../components/header/header.component";
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';

import { WithdrawMethodComponent } from './withdraw-method/w-method.component';
import { TimeFormatPipe } from '../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../reuseables/pipes/countdown.pipe';

import { CryptoHeaderComponent } from "../crypto-header/crypto-header.component";


@Component({
  selector: 'app-withdraw',
  imports: [
    WalletHeaderComponent,
    CommonModule,
    TruncateCenterPipe,
    HeaderComponent,
    SpinnerComponent,
    WithdrawMethodComponent,
    CurrencyConverterPipe,
    TimeFormatPipe,
    CountdownPipe,
    CryptoHeaderComponent
  ],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css', "../wallet.component.css"]
})
export class WithdrawComponent {

  constructor(
      public walletService:WalletService,
      private quickNav:QuickNavService
  ){}


  ngOnInit(){

    if (!this.quickNav.storeData.get("withdraw")) {
        this.quickNav.reqServerData.get('wallet?dir=start_withdraw').subscribe((res)=>{
          this.walletService.initSetting()

      })}
  }

}
