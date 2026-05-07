export interface CreateWalletDto {
  name: string;
  walletType: string;
  initialBalance: number;
  currency: string;
  color: string;
  creditLine: number | null;
}
