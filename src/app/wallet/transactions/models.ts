export type TransactionType =
  | 'deposit'
  | 'withdraw';

export type TransactionStatus =
  | 'pending'
  | 'success'
  | 'failed'
  | 'cancelled';


export interface WalletTransaction {
  id: number;
  username: string;
  type: TransactionType;
  module: string;
  generator: string;
  timestamp: string;
  created_at: string;
  txref: string;
  transactionID: string;
  sessionID: string;
  status: TransactionStatus;
  method: 'USDT' | 'BNB' | 'TRX';
  symbol: string;
  init_amount: string;
  amount: string;
  processFee: string;
  init_processFee: string;
  old_bal: string;
  new_bal: string;
  currency: string;
  init_currency: string | null;

  extraField: {
    account_number: string;
    account_holder: string;

    bank: {
      code: string;
      text: string;
    };

    payment_method: string;
    network?: string;
  };

  seen: boolean;
  completed: boolean;
  cashed: boolean;
  is_daemon: boolean;
  send_tg_mess: boolean;
  level: number;
  validated: boolean;
  proof: string | null;
  payment_link: string;
  user: number;
}


export const DEMO_TRANSACTIONS:
  WalletTransaction[] = [
  {
    id: 1,
    username: 'admin',
    type: 'deposit',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-25T14:24:00+01:00',
    created_at:
      '2026-09-25T14:24:00+01:00',
    txref: '451203',
    transactionID:
      '0x7ab130b98Ae9e750cF25494E368bE368Fc7A902a',
    sessionID: 'DEP45120392',
    status: 'success',
    method: 'USDT',
    symbol: 'credit',
    init_amount: '100.00',
    amount: '100.00',
    processFee: '0.00',
    init_processFee: '0.00',
    old_bal: '42.80',
    new_bal: '142.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        'TDQ8f3zK9h7s2LJm4385F',
      account_holder: 'USDT',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'USDT',
      network: 'TRC20'
    },
    seen: true,
    completed: true,
    cashed: true,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: true,
    proof: null,
    payment_link: '0',
    user: 1
  },

  {
    id: 2,
    username: 'admin',
    type: 'withdraw',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-25T11:11:19+01:00',
    created_at:
      '2026-09-25T11:11:19+01:00',
    txref: '141279',
    transactionID:
      '0x3ab130b98Ae9e750cF25494E368bE368Fc7A804f',
    sessionID: '13c61645163b',
    status: 'pending',
    method: 'USDT',
    symbol: 'debit',
    init_amount: '20.00',
    amount: '18.00',
    processFee: '2.00',
    init_processFee: '2.00',
    old_bal: '62.80',
    new_bal: '42.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        '0x3ab130b98Ae9e750cF25494E368bE368Fc7A804f',
      account_holder: 'USDT',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'USDT',
      network: 'TRC20'
    },
    seen: false,
    completed: false,
    cashed: false,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: false,
    proof: null,
    payment_link: '0',
    user: 1
  },

  {
    id: 3,
    username: 'admin',
    type: 'deposit',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-25T08:35:00+01:00',
    created_at:
      '2026-09-25T08:35:00+01:00',
    txref: '985132',
    transactionID:
      '0x8e4b12098Ac48163Df620904F56A',
    sessionID: 'DEP98513284',
    status: 'success',
    method: 'BNB',
    symbol: 'credit',
    init_amount: '50.00',
    amount: '50.00',
    processFee: '0.00',
    init_processFee: '0.00',
    old_bal: '12.80',
    new_bal: '62.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        '0xBNB92D8c738Fd204C71A',
      account_holder: 'BNB',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'BNB',
      network: 'BEP20'
    },
    seen: true,
    completed: true,
    cashed: true,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: true,
    proof: null,
    payment_link: '0',
    user: 1
  },

  {
    id: 4,
    username: 'admin',
    type: 'withdraw',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-24T19:45:00+01:00',
    created_at:
      '2026-09-24T19:45:00+01:00',
    txref: '620451',
    transactionID:
      'TRX9A632E84B0107F31',
    sessionID: 'WTH62045118',
    status: 'success',
    method: 'TRX',
    symbol: 'debit',
    init_amount: '32.00',
    amount: '30.00',
    processFee: '2.00',
    init_processFee: '2.00',
    old_bal: '94.80',
    new_bal: '62.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        'TDemoTRX4Lm92ZaP8Qx63Nk',
      account_holder: 'TRX',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'TRX',
      network: 'TRC20'
    },
    seen: true,
    completed: true,
    cashed: true,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: true,
    proof: null,
    payment_link: '0',
    user: 1
  },

  {
    id: 5,
    username: 'admin',
    type: 'deposit',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-23T16:15:00+01:00',
    created_at:
      '2026-09-23T16:15:00+01:00',
    txref: '307418',
    transactionID:
      'TRX6A9D310B2C3E824B',
    sessionID: 'DEP30741862',
    status: 'pending',
    method: 'TRX',
    symbol: 'credit',
    init_amount: '75.00',
    amount: '75.00',
    processFee: '0.00',
    init_processFee: '0.00',
    old_bal: '42.80',
    new_bal: '42.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        'TDemoTRX4Lm92ZaP8Qx63Nk',
      account_holder: 'TRX',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'TRX',
      network: 'TRC20'
    },
    seen: false,
    completed: false,
    cashed: false,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: false,
    proof: null,
    payment_link: '0',
    user: 1
  },

  {
    id: 6,
    username: 'admin',
    type: 'withdraw',
    module: 'wallet',
    generator: 'wallet',
    timestamp:
      '2026-09-22T10:30:00+01:00',
    created_at:
      '2026-09-22T10:30:00+01:00',
    txref: '119820',
    transactionID:
      '0x9d3f82164b6a8097c31',
    sessionID: 'WTH11982047',
    status: 'failed',
    method: 'BNB',
    symbol: 'debit',
    init_amount: '25.00',
    amount: '23.00',
    processFee: '2.00',
    init_processFee: '2.00',
    old_bal: '42.80',
    new_bal: '42.80',
    currency: 'USD',
    init_currency: null,
    extraField: {
      account_number:
        '0xBNBWithdrawalAddress92',
      account_holder: 'BNB',
      bank: {
        code: '',
        text: ''
      },
      payment_method: 'BNB',
      network: 'BEP20'
    },
    seen: true,
    completed: false,
    cashed: false,
    is_daemon: false,
    send_tg_mess: false,
    level: 0,
    validated: false,
    proof: null,
    payment_link: '0',
    user: 1
  }
];
