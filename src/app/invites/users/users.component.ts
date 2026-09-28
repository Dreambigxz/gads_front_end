import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

// import { RouterLink, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { HeaderComponent } from "../../components/header/header.component";

// import { InviteServices } from "../invite.service";

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    CurrencyConverterPipe,
    HeaderComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any = []

  constructor(
    public quickNav: QuickNavService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  rewardFilter: 'all' | 'referral' | 'rebate' = 'all';

  ngOnInit()  {

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    )
    .subscribe(() => {
      const generation = this.route.snapshot.paramMap.get('lv');
      this.loadUser(generation)
    })
  }


  // get filteredUsers() {
  //
  //     const users = this.inviteService.users || [];
  //
  //     if (this.rewardFilter === 'all') {
  //
  //         return users;
  //
  //     }
  //
  //     return users.filter(
  //         (user:any) =>
  //             user.type?.toLowerCase() ===
  //             this.rewardFilter
  //     );
  //
  // }

  loadUser(generation:any){

    if (!this.quickNav.storeData.get('promotionLevel_'+generation)) {
      this.quickNav.reqServerData.get('promotions/?level='+generation)
      .subscribe({next: res => {
          this.users =  this.quickNav.storeData.get('promotionLevel_'+generation)
        }})
      }
      this.users =  this.quickNav.storeData.get('promotionLevel_'+generation) || []

  }


  get totalEarned(): number {
    return this.users.reduce(
      (total:any, item:any) => total + Number(item.amount || 0),
      0
    );
  }





}
