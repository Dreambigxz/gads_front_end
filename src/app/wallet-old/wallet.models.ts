export type CryptoSymbol =
  | 'USDT'
  | 'BNB'
  | 'TRX';

export type TransactionStatus =
  | 'pending'
  | 'completed'
  | 'failed';

export type TransactionType =
  | 'deposit'
  | 'withdrawal';


export interface WalletBalance {
  balance: string;
  currency: string;
}


export interface CryptoNetwork {
  id: string;
  name: string;
  display_name: string;
  symbol: CryptoSymbol;
  address: string;
  qr_code_url?: string | null;
  minimum_deposit: string;
  confirmations: number;
  warning: string;
  is_active: boolean;
}


export interface CryptoAsset {
  symbol: CryptoSymbol;
  name: string;
  icon?: string | null;
  color: string;
  networks: CryptoNetwork[];
}


export interface WalletTransaction {
  id: string;
  type: TransactionType;
  asset: CryptoSymbol;
  network: string;
  amount: string;
  status: TransactionStatus;
  transaction_hash?: string | null;
  created_at: string;
}


export interface DepositPageResponse {
  balance: WalletBalance;
  assets: CryptoAsset[];
  recent_deposits: WalletTransaction[];
}


export interface WithdrawalPayload {
  asset: CryptoSymbol;
  network: string;
  address: string;
  amount: string;
}


export interface TransactionFilters {
  type?: TransactionType | 'all';
  asset?: CryptoSymbol | 'all';
  page?: number;
}
