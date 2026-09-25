import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from "../../service";


@Component({
  selector: 'app-wp-sheet',
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  templateUrl: './wp-sheet.component.html',
  styleUrl: './wp-sheet.component.css'
})
export class WpSheetComponent implements OnInit {

    cryptoForm!: any;

    localForm!: any;

  constructor(
        public wallet:WalletService,
    ){}

    editMode =  input(false);

    accountName='444';

    banks=[

        'Access Bank',

        'GTBank',

        'UBA',

        'Zenith Bank',

        'First Bank'

    ];

    ngOnInit() {

        this.cryptoForm = this.wallet.fb.group({

            account_number: ['', Validators.required],

            pin: ['', Validators.required],

            payment_method: [''],

            origin: ['']

        });

        this.localForm = this.wallet.fb.group({

            bank: ['', Validators.required],

            account_number: ['', Validators.required],

            account_holder: ['', Validators.required],

            pin: ['', Validators.required],

            payment_method: [''],

            origin: ['']

        });

    }

    get activeForm(){

      const selectedTab  = this.wallet.selectedTab

      if (selectedTab==='crypto') {
        return this.cryptoForm
      }
      return this.localForm

    }

    save(){

        const form = this.activeForm;
        form.patchValue({ payment_method: this.wallet.paymentMethod.code });
        form.patchValue({ origin: window.location.origin });


        this.wallet.formHandler.submitForm(form, "create_withdraw", 'wallet/?showSpinner', true,  (res) => {

            if (res.status==='success') {
              this.wallet.initSetting();

              this.wallet.closeSelector(this.wallet.withdrawalSheet$)
            }

        })


    }


}
