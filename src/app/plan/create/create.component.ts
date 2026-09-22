import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuickNavService } from '../../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import { SummaryComponent } from "../summary/summary.component";
import { HeaderComponent } from "../../components/header/header.component";

import { MobileMenuComponent } from "../../components/mobile-menu/mobile-menu.component";

@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    SummaryComponent,
    HeaderComponent,
    MobileMenuComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreatePlanComponent {

  constructor(
    public quickNav:QuickNavService
  ){}

  readonly rewardPerTask = 0.20;
  readonly durationDays = 70;

  activePlanKey: string | null = null;

  /*
   * Populate this from Django.
   *
   * Example:
   * completedPlanKeys = ['vip1', 'vip2', 'vip3'];
   */
  completedPlanKeys: string[] = [];

  selectedPlan: any | null = null;
  activationMessage = '';

  plans: any = []

  ngOnInit(){

    if (!this.quickNav.storeData.get("plans")) {
      this.quickNav.reqServerData.get("plans/")
      .subscribe((res:any)=>{
        this.plans = this.quickNav.storeData.get("plans")
        this.completedPlanKeys =  this.quickNav.storeData.get("completed_planKeys") || []
      })
    }
  }

  isLocked(plan: any): boolean {
    if (!plan.lockedByDefault) {
      return false;
    }

    if (!plan.unlockAfter) {
      return true;
    }

    return !this.completedPlanKeys.includes(
      plan.unlockAfter
    );
  }

  get hasPlan(){
    return this.quickNav.storeData.get("my_plans")?.active || []
  }

  isActive(plan: any): boolean {

    const activePlanKey = this.hasPlan[0]?.plan_id
    return activePlanKey === plan.id;
  }

  isCompleted(plan: any): boolean {
    return this.completedPlanKeys.includes(
      plan.key
    );
  }

  getUnlockPlanName(plan: any): string {
    const requiredPlan = this.plans.find(
      (item:any) => item.key === plan.unlockAfter
    );

    return requiredPlan?.name ?? 'previous plan';
  }

  getMaximumPlanReward(plan: any): number {
    return (
      plan.dailyReward *
      plan.durationDays
    );
  }

  selectPlan(plan: any): void {
    this.activationMessage = '';

    if (this.isLocked(plan)) {
      this.activationMessage =
        `Complete ${this.getUnlockPlanName(plan)} ` +
        `to unlock ${plan.name}.`;

      return;
    }

    if (this.isActive(plan)) {
      this.activationMessage =
        `${plan.name} is already active.`;

      return;
    }

    this.selectedPlan = plan;
  }

  closeConfirmation(): void {
    this.selectedPlan = null;
  }

  confirmActivation(): void {
    if (!this.selectedPlan) {
      return;
    }

    const plan = this.selectedPlan;


    /*
     * Call your Django activation endpoint here.
     * Only update activePlanKey after the server
     * successfully activates the plan.
     */

     let processor = 'create_plan'
     if (this.hasPlan.length) {
       processor = "change_plan"
     }
     this.quickNav.reqServerData.post('plans/', {plan_id:plan.id, processor})
     .subscribe((res:any)=>{

       this.closeConfirmation();
     })

  }

    formatMoney(amount: number): string {

    if (!amount) {
      amount=0
    }
    return amount.toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }
    );
  }

    getActivationtext(plan:any){

    let text = `Activate ${plan.name}`
    if (this.hasPlan.length) text = `Change to ${plan.name}`;

    return text;

  }



}
