import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-plan-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    CommonModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Input() trade!: any;
  @Input() ads!: any;
  @Input() adsService!: any;
  @Input() plan!: any;
  @Input() hasPlan!: any;
  @Output() viewDetails = new EventEmitter<void>();



  get durationDays(): number {
    const activePlan = this.hasPlan?.[0];

    if (!activePlan) {
      return 0;
    }

    return Number(
      this.plan?.[activePlan.id]?.durationDays ?? 0
    );
  }

  get runningDays(): number {
    const createdAt = this.hasPlan?.[0]?.created_at;

    if (!createdAt) {
      return 0;
    }

    const opened = new Date(createdAt);
    const today = new Date();

    opened.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const milliseconds = today.getTime() - opened.getTime();

    return Math.max(
      0,
      Math.floor(milliseconds / (1000 * 60 * 60 * 24))
    );
  }

  get remainingDays(): number {
    return Math.max(0, this.durationDays - this.runningDays);
  }

  get progress(): number {
    if (!this.durationDays) {
      return 0;
    }

    return Math.min(
      100,
      (this.runningDays / this.durationDays) * 100
    );
  }

  get endingDate(): Date | null {
    const createdAt = this.hasPlan?.[0]?.created_at;

    if (!createdAt || !this.durationDays) {
      return null;
    }

    const ending = new Date(createdAt);
    ending.setDate(ending.getDate() + this.durationDays);

    return ending;
  }

  viewTasks(type: 'available' | 'pending' | 'done'): void {
    // this.router.navigate(['/tasks'], {
    //   queryParams: { status: type }
    // });
}

}
