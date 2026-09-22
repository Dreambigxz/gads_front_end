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
  @Input() plan!: any;
  @Input() hasPlan!: any;
  @Output() viewDetails = new EventEmitter<void>();

  get progress(): number {
    if (!this.trade?.totalDays) return 0;
    return Math.min(100, Math.max(0, (this.trade.runningDays / this.trade.totalDays) * 100));
  }

  get remainingDays(): number {
    return Math.max(0, this.trade.totalDays - this.trade.runningDays);
  }
}
