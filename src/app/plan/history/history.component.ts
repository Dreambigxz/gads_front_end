import { CommonModule,Location } from '@angular/common';

import {
  Component,
  OnInit,
  computed,
  signal
} from '@angular/core';

import { HeaderComponent } from "../../components/header/header.component";
import { QuickNavService } from '../../reuseables/services/quick-nav.service'; // ✅ adjust path as needed

@Component({
  selector: 'app-history',
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  earnings = signal<any[]>([]);
  summary = signal<any>({
    total_amount: '0.00',
    total_tasks: 0,
    today_amount: '0.00',
    today_tasks: 0,
    per_task: '0.20',
    plans: []
  });

  loading = signal(false);
  loadingMore = signal(false);

  currentPage = signal(1);
  totalPages = signal(1);
  totalCount = signal(0);
  hasNextPage = signal(false);

  activePeriod = signal<
    'all' | 'today' | 'week'
  >('all');

  activePlan = signal('all');

  periods: any[] = [
    {
      key: 'all',
      label: 'All'
    },
    {
      key: 'today',
      label: 'Today'
    },
    {
      key: 'week',
      label: 'This Week'
    }
  ];

  groupedEarnings = computed(() => {
    const groups = new Map<
      string,
      {
        key: string;
        label: string;
        date: Date;
        amount: number;
        tasks: number;
        items: any[];
      }
    >();

    for (const earning of this.earnings()) {
      const date = new Date(
        earning.timestamp
      );

      const key = [
        date.getFullYear(),
        String(
          date.getMonth() + 1
        ).padStart(2, '0'),
        String(
          date.getDate()
        ).padStart(2, '0')
      ].join('-');

      if (!groups.has(key)) {
        groups.set(key, {
          key,
          label: this.dateLabel(date),
          date,
          amount: 0,
          tasks: 0,
          items: []
        });
      }

      const group = groups.get(key)!;

      group.items.push(earning);
      group.tasks += 1;
      group.amount += Number(
        earning.amount || 0
      );
    }

    return Array.from(
      groups.values()
    ).sort(
      (a, b) =>
        b.date.getTime() -
        a.date.getTime()
    );
  });

  constructor(
    public quickNav: QuickNavService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadEarnings(true);
  }

  loadEarnings(reset = false): void {
    if (
      this.loading() ||
      this.loadingMore()
    ) {
      return;
    }

    const page = reset
      ? 1
      : this.currentPage() + 1;

    if (reset) {
      this.loading.set(true);
    } else {
      this.loadingMore.set(true);
    }

    const period = this.activePeriod();
    const plan = encodeURIComponent(
      this.activePlan()
    );

    const url =
      `plan-earnings/` +
      `?page=${page}` +
      `&period=${period}` +
      `&plan=${plan}&hideSpinnerimportant`;

    this.quickNav.reqServerData
      .get(url)
      .subscribe({
        next: (response: any) => {

          const results =
            response?.results ?? [];

          this.earnings.set(
            reset
              ? results
              : [
                  ...this.earnings(),
                  ...results
                ]
          );

          this.summary.set(
            response?.summary ??
            this.summary()
          );

          this.currentPage.set(
            response?.current_page ?? page
          );

          this.totalPages.set(
            response?.total_pages ?? 1
          );

          this.totalCount.set(
            response?.count ?? 0
          );

          this.hasNextPage.set(
            Boolean(response?.next)
          );

          this.loading.set(false);
          this.loadingMore.set(false);
        },

        error: () => {
          this.loading.set(false);
          this.loadingMore.set(false);
        }
      });
  }

  loadMore(): void {
    if (!this.hasNextPage()) {
      return;
    }

    this.loadEarnings(false);
  }

  selectPeriod(
    period: 'all' | 'today' | 'week'
  ): void {
    if (
      this.activePeriod() === period
    ) {
      return;
    }

    this.activePeriod.set(period);
    this.resetAndLoad();
  }

  selectPlan(plan: string): void {
    if (this.activePlan() === plan) {
      return;
    }

    this.activePlan.set(plan);
    this.resetAndLoad();
  }

  resetAndLoad(): void {
    this.earnings.set([]);
    this.currentPage.set(1);
    this.hasNextPage.set(false);

    this.loadEarnings(true);
  }

  goBack(): void {
    this.location.back();
  }

  trackGroup(
    index: number,
    group: any
  ): string {
    return group.key;
  }

  trackEarning(
    index: number,
    earning: any
  ): number {
    return earning.id;
  }

  private dateLabel(date: Date): string {
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    if (
      this.sameDate(date, today)
    ) {
      return `Today · ${this.shortDate(
        date
      )}`;
    }

    if (
      this.sameDate(date, yesterday)
    ) {
      return `Yesterday · ${this.shortDate(
        date
      )}`;
    }

    return this.shortDate(date);
  }

  private sameDate(
    first: Date,
    second: Date
  ): boolean {
    return (
      first.getFullYear() ===
        second.getFullYear() &&
      first.getMonth() ===
        second.getMonth() &&
      first.getDate() ===
        second.getDate()
    );
  }

  private shortDate(date: Date): string {
    return new Intl.DateTimeFormat(
      'en-US',
      {
        month: 'short',
        day: 'numeric'
      }
    ).format(date);
  }


}
