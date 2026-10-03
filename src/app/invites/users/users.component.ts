import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';

type Period = 'today' | 'week' | 'all';

interface Promotion {
  id: number;
  referred_user: string;
  generation: number;
  amount: string;
  base_amount: string;
  type: string;
  currency: string;
  created_at: string;
  timestamp: string;
  cashed: boolean;
  ready_for_cash: boolean;
  user: number;
}

interface PromotionPage {
  count: number;
  total_earned: string;
  currency: string;
  next: string | null;
  previous: string | null;
  results: Promotion[];
}

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    CurrencyConverterPipe,
    HeaderComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Promotion[] = [];
  period: Period = 'week';
  page = 1;
  readonly pageSize = 10;

  count = 0;
  totalEarned = 0;
  currency = 'USD';
  loading = false;
  error = '';
  generation = 1;

  private readonly destroy$ = new Subject<void>();
  private requestId = 0;

  constructor(
    public quickNav: QuickNavService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.generation = Number(params.get('lv')) || 1;
        this.page = 1;
        this.loadUsers();
      });
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageSize);
  }

  setPeriod(period: Period): void {
    if (period === this.period) return;
    this.period = period;
    this.page = 1;
    this.loadUsers();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page || this.loading) {
      return;
    }
    this.page = page;
    this.loadUsers();
  }

  loadUsers(): void {
    const currentRequest = ++this.requestId;
    this.loading = true;
    this.error = '';

    const params = `level=${this.generation}&period=${this.period}&page=${this.page}`

    this.quickNav.reqServerData.get(`active-users/?${params}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response:any) => {
          if (currentRequest !== this.requestId) return;

            console.log({response});

          this.users = response.results;
          this.count = response.count;
          this.totalEarned = Number(response.total_earned);
          this.currency = response.currency;
          this.loading = false;
        },
        error: () => {
          if (currentRequest !== this.requestId) return;

          this.users = [];
          this.loading = false;
          this.error = 'Could not load referrals. Please try again.';
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
