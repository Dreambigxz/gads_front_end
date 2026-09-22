import { Routes } from '@angular/router';
import { authGuard } from './reuseables/auth/auth.guard';
import { AuthComponent } from "./auth/auth.component";

import { MainComponent } from "./main/main.component";
import { DetailsComponent } from "./articles/details/details.component";

import { CreatePlanComponent } from "./plan/create/create.component";

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
    path:"plan/activation",
    component: CreatePlanComponent,
    title:"Activate plan",
    canActivate: [authGuard]

  }


];
