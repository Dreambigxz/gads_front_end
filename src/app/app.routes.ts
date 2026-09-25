import { Routes } from '@angular/router';
import { authGuard } from './reuseables/auth/auth.guard';
import { AuthComponent } from "./auth/auth.component";

import { MainComponent } from "./main/main.component";
import { DetailsComponent } from "./articles/details/details.component";

import { CreatePlanComponent } from "./plan/create/create.component";

import {  SponsoredAdsComponent } from "./sponsored-ads/sponsored-ads.component";

import { DepositComponent } from "./wallet/deposit/deposit.component";
import { WithdrawComponent } from "./wallet/withdraw/withdraw.component";
import { TransactionsComponent } from "./wallet/transactions/transactions.component";

export const routes: Routes = [

  // auth
  {
    path: 'auth',
      component: AuthComponent,
      title:"Authorization",
  },

  // main

  {
    path:"",
    component:  MainComponent,
    title: "Main",
    canActivate: [authGuard]

  },

  // mews Details
  {
    path: 'article/:id',
      component: DetailsComponent,
      title:"Article details",
      canActivate: [authGuard]
  },

  //activate plan
  {
    path:"plan/task",
    component: CreatePlanComponent,
    title:"Activate plan",
    canActivate: [authGuard]

  },


  {
    path:"ads",
    component: SponsoredAdsComponent,
    canActivate: [authGuard]

  },

  // wallet routes
  {
    path:"wallet/deposit",
    component: DepositComponent,
    canActivate: [authGuard]

  },
  {
    path:"wallet/withdraw",
    component: WithdrawComponent,
    canActivate: [authGuard]

  },
  {
    path:"wallet/transactions",
    component:  TransactionsComponent,
    title: "Transaction",
    canActivate: [authGuard]

  },


];
