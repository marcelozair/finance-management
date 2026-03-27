export interface WalletDto {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
  color: string;
}

export interface CreateWalletPayload {
  name: string;
  walletType: string;
  initialBalance: number;
  currency: string;
  color: string;
}
