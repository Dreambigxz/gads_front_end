# Traffix task plans — Angular 18 standalone component

Copy this folder into `src/app/task-plans/`. No icon package or Angular Material dependency is needed; navigation icons are inline SVG.

Import `TaskPlansComponent` in the parent standalone component's `imports`, and `TaskPlan` from the models file for API response typing.

```ts
import { Component, signal } from '@angular/core';
import { TaskPlansComponent } from './task-plans/task-plans.component';
import { TaskPlan } from './task-plans/task-plans.models';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [TaskPlansComponent],
  template: `
    <app-task-plans
      [records]="userPlans()"
      (continueTasks)="openTasks($event)"
      (navigate)="openPage($event)"
    />
  `,
})
export class MyTasksComponent {
  userPlans = signal<TaskPlan[]>([{
    id: 15, status: 'active', ref_num: '18d481781', plan_id: 0,
    name: '455F64C', amount: '0.00',
    created_at: '2026-09-30T11:50:55.260628-03:00',
    updated_at: '2026-09-30T11:50:55.260632-03:00',
    next_earning_at: '2026-10-01T11:50:55.260569-03:00', user: 32,
  }]);
  openTasks(plan: TaskPlan) {
    // Use your actual tasks route or fetch your task queue for plan.id here.
    console.log('Selected plan:', plan.id);
  }
  openPage(page: string) {
    // Connect this to your existing Router routes.
    console.log('Navigate:', page);
  }
}
```

Replace the demo array using `this.userPlans.set(response)` after your API request. Pass a new array when updating records so signals recompute. Optional `[loading]`, `[error]` and `(retry)` handle API states. There is no invented API endpoint or route.

- Running contains status `active`; Completed contains `completed`. Pending and closed records are excluded from these two tabs.
- Plan terms come from `plans[plan_id]` (with ID fallback for reordered custom catalogs). All VIP0–VIP7 values are included; VIP5 rewardPerTask is corrected to 0.2.
- Days left = ceil(remaining milliseconds / 86400000), clamped to zero and plan duration. Updates every minute in browser; timer is cleaned up on destruction and is not started during SSR. Completed plans show zero. Expired active plans remain Running until backend status changes.
- Expected end prefers `expected_end_at` from your API; otherwise adds durationDays × 24 hours to created_at. This assumes created_at is the activation time. If activation differs or the backend uses calendar-day expiry, return expected_end_at.
- Original ISO offsets are parsed correctly, then formatted in Africa/Lagos. Use `[timeZone]` to pass a client IANA zone such as America/Los_Angeles. No manual hour subtraction.
- Actual total earned uses optional `total_earned` from the API. Missing earnings show “—”; zero explicitly shows $0.00. Earnings are never inferred from dailyReward or elapsed time.
- Optional `[serverNow]` accepts an ISO server time to anchor the remaining-time calculation (also helpful for SSR consistency).
- Optional `[currency]` defaults to USD.
- Set `[showHeader]="false"` and/or `[showNavigation]="false"` when your app already has these elements. Navigation and Continue emit events for your parent to handle.
- Tabs support click, arrow keys, Home/End and ARIA roles. Lists adapt to one column on mobile and two on larger screens.

Validation: Pure date/amount calculations checked in the delivery environment. Angular packages are not installed there, so a full Angular template build must be run inside your project (`ng build`).
