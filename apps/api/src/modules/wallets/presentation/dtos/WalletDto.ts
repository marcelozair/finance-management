export interface WalletDto {
  id: number;
  name: string;
  type: string;
  balance: number;
  formattedBalance: string;
  currency: string;
  color: string;
}
