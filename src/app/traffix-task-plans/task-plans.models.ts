export interface VipPlan {
  id: number;
  key: string;
  name: string;
  price: number;
  rewardPerTask: number;
  dailyTasks: number;
  dailyReward: number;
  durationDays: number;
  lockedByDefault: boolean;
  unlockAfter: string | null;
  popular?: boolean;
}

export interface TaskPlan {
  id: number;
  status: 'pending' | 'active' | 'completed' | 'close' | 'closed';
  ref_num: string;
  plan_id: number;
  name: string;
  amount: string | number;
  created_at: string;
  updated_at?: string;
  next_earning_at?: string | null;
  user?: number;
  /** Actual earnings from your API; never inferred from elapsed days. */
  total_earned?: string | number | null;
  /** Prefer a server supplied ending timestamp when available. */
  expected_end_at?: string | null;
}

export const VIP_PLANS: readonly VipPlan[] = [
  { id: 0, key: 'vip0', name: 'VIP 0', price: 0, rewardPerTask: 0.2, dailyTasks: 5, dailyReward: 1, durationDays: 2, lockedByDefault: false, unlockAfter: null },
  { id: 1, key: 'vip1', name: 'VIP 1', price: 10, rewardPerTask: 0.2, dailyTasks: 2, dailyReward: 0.4, durationDays: 70, lockedByDefault: false, unlockAfter: null },
  { id: 2, key: 'vip2', name: 'VIP 2', price: 30, rewardPerTask: 0.2, dailyTasks: 5, dailyReward: 1, durationDays: 70, lockedByDefault: false, unlockAfter: null, popular: true },
  { id: 3, key: 'vip3', name: 'VIP 3', price: 90, rewardPerTask: 0.2, dailyTasks: 15, dailyReward: 3, durationDays: 70, lockedByDefault: false, unlockAfter: null },
  { id: 4, key: 'vip4', name: 'VIP 4', price: 180, rewardPerTask: 0.2, dailyTasks: 30, dailyReward: 6, durationDays: 70, lockedByDefault: true, unlockAfter: 'vip3' },
  { id: 5, key: 'vip5', name: 'VIP 5', price: 270, rewardPerTask: 0.2, dailyTasks: 45, dailyReward: 9, durationDays: 70, lockedByDefault: true, unlockAfter: 'vip4' },
  { id: 6, key: 'vip6', name: 'VIP 6', price: 360, rewardPerTask: 0.2, dailyTasks: 60, dailyReward: 12, durationDays: 70, lockedByDefault: true, unlockAfter: 'vip5' },
  { id: 7, key: 'vip7', name: 'VIP 7', price: 450, rewardPerTask: 0.2, dailyTasks: 75, dailyReward: 15, durationDays: 70, lockedByDefault: true, unlockAfter: 'vip6' },
];

const DAY_MS = 86_400_000;
export function validTimestamp(value?: string | null): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}
export function finiteAmount(value?: string | number | null): number | null {
  if (value == null || String(value).trim() === '') return null;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}
export function expectedEnd(record: TaskPlan, plan?: VipPlan): number | null {
  const explicit = validTimestamp(record.expected_end_at);
  if (explicit !== null) return explicit;
  const start = validTimestamp(record.created_at);
  return start !== null && plan ? start + plan.durationDays * DAY_MS : null;
}
export function daysRemaining(end: number | null, now: number, duration: number | null, completed: boolean): number | null {
  if (completed) return 0;
  if (end === null) return null;
  const days = Math.max(0, Math.ceil((end - now) / DAY_MS));
  return duration === null ? days : Math.min(duration, days);
}
