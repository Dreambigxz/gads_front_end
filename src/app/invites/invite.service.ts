import { Injectable } from '@angular/core';
import { StoreDataService } from '../reuseables/http-loader/store-data.service'; // ✅ adjust path as needed
import { QuickNavService } from '../reuseables/services/quick-nav.service';

@Injectable({
  providedIn: 'root'
})
export class InviteServices {

  constructor(
    public storeData: StoreDataService,
    public quickNav: QuickNavService
  ) {}

  page: string = 'commissions';
  level: string = 'all';
  users : any = [ ]

  pending_users = false

  isLoading = false

  getNext15th(): Date {
    const now = new Date();

    const next15th = new Date(
      now.getFullYear(),
      now.getMonth(),
      15
    );

    if (now.getDate() >= 15) {
      next15th.setMonth(next15th.getMonth() + 1);
    }

    return next15th;
  }

  get calculateTabData() {

    const ref = this.storeData.store['refDir'];
    const active = ref.active
    const total = ref.active
    const page = this.page;
    const level = this.level;

    const data = {
      amount: 0,
      count: 0,
      frozen: 0 ,
      total: 0,
      active: 0,
      deposit: { amount: 0, count: 0 },
      withdraw: { amount: 0, count: 0 },
      cashout_at: this.getNext15th()
      // users: [ ]
    };

    const getGen = (key: string, gen: number) => {
      const res =  ref?.[key]?.[`generation_${gen}`] || { count: 0, amount: 0 };


      if (key==='referral') {
        data.total += ref.total[`generation_${gen}`]
        data.active += ref.active[`generation_${gen}`]
      }

      return res
    };

    const sumGen = (key: string, target: any) => {
      for (let g = 1; g <= 3; g++) {
        const d = getGen(key, g);
        target.amount += d.amount || 0;
        target.count += d.count || 0;
        if(d.frozen){
          target.frozen += d.frozen
        }

      }
    };

    const gen = parseInt(level.replace('level', '')) || 1;

    /* COMMISSIONS */
    if (page === 'commissions') {

      if (level === 'all') {
        sumGen('referral', data);
        sumGen('rebate', data);



      } else {
        const r = getGen('referral', gen);
        const b = getGen('rebate', gen);

        data.amount = r.amount + b.amount || 0;
        data.count = r.count || 0;
        data.frozen = b.frozen || 0

      }


    }

    /* TRANSACTIONS */
    if (page === 'transactions') {

      if (level === 'all') {
        sumGen('deposit', data.deposit);
        sumGen('withdraw', data.withdraw);
      } else {
        Object.assign(data.deposit, getGen('deposit', gen));
        Object.assign(data.withdraw, getGen('withdraw', gen));
      }
    }

    /* USERS */
    if (page === 'users') {


      if (this.isLoading)return data;


      if (this.level.includes('pending')){
        this.users = this.loadUser(this.level)
      }else{
        this.users = this.loadUser(gen)
      }

    }

    return data;
  }

  loadUser(generation:any){

    if (!this.quickNav.storeData.get('promotionLevel_'+generation)) {
      this.isLoading  =  true
        this.quickNav.reqServerData.get('promotions/?level='+generation).subscribe({next: res => {
          this.isLoading  =  false
          return this.quickNav.storeData.get('promotionLevel_'+generation)
        }})
      }



      return this.quickNav.storeData.get('promotionLevel_'+generation)

  }

}
