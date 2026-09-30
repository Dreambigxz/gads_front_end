import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { SummaryComponent } from "../summary/summary.component";

import { QuickNavService } from '../../reuseables/services/quick-nav.service';
import { CountdownPipe } from '../../reuseables/pipes/countdown.pipe';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { MobileMenuComponent } from "../../components/mobile-menu/mobile-menu.component";

import { SponsoredAdsModalService } from "../../sponsored-ads/sponsored-ads.service";

import { Router , NavigationStart, NavigationEnd} from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-activated',
  imports: [
    CommonModule,
    HeaderComponent,
    SummaryComponent,
    CountdownPipe,
    CurrencyConverterPipe,
    MobileMenuComponent
  ],
  templateUrl: './activated.component.html',
  styleUrl: './activated.component.scss'
})
export class ActivatedComponent {

  activePlans:any[] = [];
  completedPlans:any[] = [];
  history:any[] = [ ]

  page:string = 'active'

  constructor(
    public quickNav: QuickNavService,
    private router: Router,
    public adsService: SponsoredAdsModalService

  ) {}

  ngOnInit(){

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    )
    .subscribe(() => {
      const url = new URL(window.location.href);
      if (url.pathname !== '/plan/activated') return;
      this.preparePlans();
    });

  }

  // =========================
  // 🔥 PREPARE UI DATA ONCE
  // =========================
  async preparePlans()  {

    if (!this.quickNav.storeData.get('my_plans')) {
      await this.quickNav.reqServerData.get('plans/').toPromise()
    }

    const store = this.quickNav.storeData.store;

    this.activePlans = (store['my_plans']?.active || []).map((p:any) => this.transformPlan(p));
    this.completedPlans = (store['my_plans']?.completed || []).map((p:any) => this.transformPlan(p));
    this.history = store['history']
    this.loadSponsorAds()

  }

  transformPlan(plan:any){


    const planData = this.quickNav.storeData.get("plans")[plan.plan_id]

    const progress = this.getAccruedPercent(plan.created_at, planData.lock_days);

    const accrued = this.getAccruedProfit(planData, plan.amount, plan.created_at);

    const dailyInfo = this.getDailyProfit(plan.plan_id, plan.amount);

    return {
      ...plan,
      planData,
      progress,
      accrued,
      dailyInfo,
      remainingDays: this.getDaysDifference(this.endDate(plan.created_at, planData.lock_days))
    };
  }

  calculateReturn(plan:any, amount:any) {

    const percent = plan.dailyReward;
    const days = plan.lock_days;

    const dailyProfit = amount * (percent / 100);
    const totalProfit = dailyProfit * days;
    const totalReturn = amount + totalProfit;

    return [percent, dailyProfit, totalProfit, totalReturn, plan];
  }

  getAccruedPercent(created_at:any, lock_days:any): number {

    const start = new Date(created_at).getTime();
    const now = Date.now();

    const percent = ((now - start) / (1000 * 60 * 60 * 24 * lock_days)) * 100;

    return Math.min(100, Math.max(0, Math.floor(percent)));
  }

  getAccruedProfit(plan:any, amount:any, created_at:any) {

    console.log({plan});

    const createdAt = new Date(created_at).getTime();
    const now = Date.now();

    let daysPassed = (now - createdAt) / (1000 * 60 * 60 * 24);

    daysPassed = Math.max(0, Math.min(daysPassed, plan.durationDays));


    const dailyProfit = parseFloat(amount) * (plan.dailyReward / 100);

    return {
      daysPassed: Math.floor(daysPassed),
      accrued: dailyProfit * daysPassed,
      dailyProfit
    };
  }

  getAccruedProfit_(plan:any , amount: any, created_at:any){

    const createdAt = new Date(created_at);
    const now = new Date();

    let elapsedDays = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    elapsedDays = Math.max(elapsedDays, 0);

    const expectedEarned = +(
      Number(amount) *
      Number(plan.dailyReward) /
      100 *
      elapsedDays
    ).toFixed(2);

    return expectedEarned

  }

  endDate(created_at:any, lock_days:any) {

    const result = new Date(created_at);
    result.setDate(result.getDate() + lock_days);

    return result;
  }

  getDaysDifference(d1:any, d2=new Date()) {

    const diffTime = new Date(d1).getTime() - new Date(d2).getTime();

    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  getDailyProfit(plan_id:any,amount:any){

    const planData = this.quickNav.storeData.get("plans")[plan_id]

    let data = this.calculateReturn(planData,parseFloat(amount))
    return data
  }

  canCloseTrade(created_at_str:any, minutes:number=5){

    const expiry = new Date(created_at_str)
    expiry.setMinutes(expiry.getMinutes()+ minutes)

    return expiry
  }

  closeTrade(plan_id:any){

    this.quickNav.confirmation.show({

        title: 'Close trade',

        message:
            `You're about to close this transaction.\nDo you want to continue?`,

        confirmText: 'Continue',

        cancelText: 'Cancel',

        onConfirm: () => {

          this.quickNav.reqServerData.post('plan/',{processor:'cancel_plan',plan_id}).subscribe({
            next:(res:any)=>{

              console.log({res });

          }
        })


        }

    });
  }

  //

  get hasPlan(){
    return this.quickNav.storeData.get("my_plans")?.active || []
  }

  loadSponsorAds(){

    if (this.hasPlan.length) {
      this.adsService.open(this.quickNav.storeData.get("ads"))
    }
  }


}
