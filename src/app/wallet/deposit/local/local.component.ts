import { Component, input, inject , ElementRef, ViewChild, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterPipe } from '../../../reuseables/pipes/currency-converter.pipe';
import { TimeFormatPipe } from '../../../reuseables/pipes/time-format.pipe';

import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-local',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyConverterPipe,
    TimeFormatPipe
  ],
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css', "../../wallet.component.css"]
})
export class LocalComponent {

  walletService = input<any>()

  amount: number =0// null = null;

  showPaymentRemarkModal = false;
  showSenderNameInput = false;
  senderName = '';

  receipt: File | null = null;

  loading = false;

  generated = false;

  quickAmounts = [

      10,
      20,
      50,
      100,
      200,
      500

  ];

  @Input() selectedAccount: any = null;

  deposit:any;

  ngOnInit(){
    this.chooseAccount()
  }

  setAmount(amount: number) {

    this.amount = amount;

  }

  generateAccount() {

    const data = {
      amount: this.amount,
      method: this.walletService().paymentMethod.code,
      processor:'create_deposit'
    }

    this.walletService().quickNav.reqServerData.post('wallet/', data)
    .subscribe((res:any) => {
      this.walletService().initSetting().deposit(this);
      this.chooseAccount()
    })

  }

  chooseAccount(account: any = this.selectedAccount) {


    this.selectedAccount = account;

    setTimeout(() => {

      document
      .getElementById('payToAccount')
      ?.scrollIntoView({

          behavior: 'smooth',

          // block: 'stop'

      });

    }, 300);



  }

  receiptChanged(event: Event) {

      const input = event.target as HTMLInputElement;

      if (!input.files?.length) {
          return;
      }

      this.receipt = input.files[0];

  }

  get statusText(){

      switch(this.deposit.status){

          case 'pending':

              return 'Awaiting Payment';

          case 'confirmation':

              return 'Awaiting Confirmation';

          case 'completed':

              return 'Completed';

          default:

              return 'Unknown';

      }

  }

  submit() {

    const formData = new FormData();

    formData.append(
        'transaction_id',
        this.senderName!
    );

    formData.append(
        'image',
        this.receipt!
    );

    formData.append(
        'processor',
        "payment_receipt"
    );

    formData.append(
      "origin",
      window.location.origin
    )

    this.walletService().quickNav.reqServerData.post('upload/', formData).subscribe()

  }

  // paymentRemark script
  openPaymentRemarkModal() {
    this.showPaymentRemarkModal = true;
    this.showSenderNameInput = false;
    this.senderName = '';
  }


  closePaymentRemarkModal() {
    this.showPaymentRemarkModal = false;
  }

  paymentRemarkResponse(usedEmail: boolean) {

    if (usedEmail) {

      // User used email as payment remark
      this.showPaymentRemarkModal = false;

      // Continue payment verification
      this.Paid()

      return;
    }

    // User did not use email
    this.showSenderNameInput = true;
  }


  Paid() {


    const name = this.senderName.trim();
    const payload= {
      senders_name:name,
      id:this.walletService()?.quickNav.storeData.get('deposit')[0].id,
       processor:'payment_completed',
       origin:window.location.origin
     }

    this.showPaymentRemarkModal = false;

    // Send name with your payment verification
    this.walletService().quickNav.reqServerData.post('wallet/', payload).subscribe()
  }


  checkDepositLocal(){

    this.walletService().quickNav.reqServerData.get("wallet?check_deposit/")
    .subscribe()

  }



}
