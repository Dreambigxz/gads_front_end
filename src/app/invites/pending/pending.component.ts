import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickNavService } from '../../reuseables/services/quick-nav.service';
// import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-pending',
  imports: [
    CommonModule,
    HeaderComponent

  ],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {

  pending: any = []

  constructor(
    public quickNav: QuickNavService
  ){}

  ngOnInit(){
    if (!this.quickNav.storeData.get('promotionLevel_pending')) {
      this.quickNav.reqServerData.get('promotions/?level=pending')
      .subscribe({next: res => {
          this.pending =  this.quickNav.storeData.get('promotionLevel_pending')
        }})
      }
  }

}
