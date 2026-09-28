import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { HeaderComponent } from "../../components/header/header.component";

import { QuickNavService } from '../../reuseables/services/quick-nav.service';

@Component({
  selector: 'app-reward',
  imports: [
    CommonModule,CurrencyConverterPipe,
    SpinnerComponent,HeaderComponent
  ],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.css'
})
export class RewardComponent {

  totalInvites = 0;
  totalCashed = 0
  rewards: any = []

  constructor(
    public quickNav: QuickNavService
  ){}

  ngOnInit(){
    if (!this.quickNav.storeData.get('invite-rewards')) {
      this.quickNav.reqServerData.get("invite-rewards/")
      .subscribe((res:any)=>{
        const rewards = res.main['invite-rewards']

        this.totalInvites = rewards.total_invites
        this.totalCashed = rewards.total_cashed
        this.rewards = rewards.rewards

      })
    }
  }

  getProgress(reward: any) {

    const percentage =
      (this.totalInvites / reward.invites_required) * 100;

    return Math.min(
      Math.round(percentage),
      100
    );

  }


  get nextReward() {

    return this.rewards.find(
      (reward:any) =>
        this.totalInvites < reward.invites_required
    );

  }

  shareInvite() {

    // Your invite/share logic here

  }

  get totalRewardAmount(): number {

    return this.rewards.reduce(
      (total:any, reward:any) =>
        total + Number(reward.reward_amount),
      0
    );

  }


  get unlockedCash(): number {

    return this.rewards
      .filter((reward:any) =>
        this.totalInvites >= reward.invites_required
      )
      .reduce(
        (total:any, reward:any) =>
          total + Number(reward.reward_amount),
        0
      );

  }


  get remainingCash(): number {

    return Math.max(
      this.totalRewardAmount - this.unlockedCash,
      0
    );

  }


  get cashProgress(): number {

    if (!this.totalRewardAmount) {
      return 0;
    }

    return Math.min(
      Math.round(
        (this.unlockedCash / this.totalRewardAmount) * 100
      ),
      100
    );

  }

}
