export interface WalletDto {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
  color: string;
  creditLine: number | null;
}

export interface CreateWalletPayload {
  name: string;
  color: string;
  currency: string;
  walletType: string;
  initialBalance: number;
  creditLine: number | null;
}
