import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, PLATFORM_ID, Output, computed, inject, input, signal } from '@angular/core';
import { TaskPlan, VIP_PLANS, VipPlan, daysRemaining, expectedEnd, finiteAmount, validTimestamp } from './task-plans.models';

type Tab = 'running' | 'completed';
export type TaskDestination = 'home' | 'tasks' | 'wallet' | 'profile';
let instanceCount = 0;

@Component({
  selector: 'app-task-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-plans.component.html',
  styleUrls: ['./task-plans.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPlansComponent {
  readonly records = input<readonly TaskPlan[]>([]);
  readonly plans = input<readonly VipPlan[]>(VIP_PLANS);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly showHeader = input(true);
  readonly showNavigation = input(true);
  readonly timeZone = input('Africa/Lagos');
  readonly currency = input('USD');
  /** Optional server clock for consistent countdowns/SSR; ISO timestamp. */
  readonly serverNow = input<string | null>(null);
  @Output() readonly continueTasks = new EventEmitter<TaskPlan>();
  @Output() readonly navigate = new EventEmitter<TaskDestination>();
  @Output() readonly retry = new EventEmitter<void>();

  readonly activeTab = signal<Tab>('running');
  readonly uid = `task-plans-${++instanceCount}`;
  private readonly tick = signal(Date.now());
  private readonly initialTick = this.tick();
  readonly now = computed(() => {
    const server = validTimestamp(this.serverNow());
    return server === null ? this.tick() : server + this.tick() - this.initialTick;
  });
  readonly running = computed(() => this.records().filter(r => r.status === 'active'));
  readonly completed = computed(() => this.records().filter(r => r.status === 'completed'));
  readonly cards = computed(() => {
    const list = this.activeTab() === 'running' ? this.running() : this.completed();
    return list.map(record => {
      // Array indexed by plan_id, with an ID check for custom/reordered catalogs.
      const indexed = this.plans()[record.plan_id];
      const plan = indexed?.id === record.plan_id ? indexed : this.plans().find(p => p.id === record.plan_id);
      const end = expectedEnd(record, plan);
      const completed = record.status === 'completed';
      return {
        record, plan, completed, end,
        title: plan?.name ?? `Plan #${record.plan_id}`,
        earned: finiteAmount(record.total_earned),
        amount: finiteAmount(record.amount),
        started: validTimestamp(record.created_at),
        nextEarning: validTimestamp(record.next_earning_at),
        daysLeft: daysRemaining(end, this.now(), plan?.durationDays ?? null, completed),
        expired: !completed && end !== null && end <= this.now(),
      };
    });
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const timer = setInterval(() => this.tick.set(Date.now()), 60_000);
      destroyRef.onDestroy(() => clearInterval(timer));
    }
  }

  dateLabel(value: number | null): string {
    if (value === null) return '—';
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: this.timeZone(), day: '2-digit', month: 'short', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }).format(value);
    } catch { return '—'; }
  }
  money(value: number | null): string {
    if (value === null) return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency() }).format(value);
    } catch { return value.toFixed(2); }
  }
  onTabKey(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tab: Tab = event.key === 'Home' ? 'running' : event.key === 'End' ? 'completed' : this.activeTab() === 'running' ? 'completed' : 'running';
    this.activeTab.set(tab);
    const target = event.currentTarget as HTMLElement | null;
    (target?.parentElement?.querySelector('[id="' + this.uid + '-' + tab + '"]') as HTMLElement | null)?.focus();
  }
}
