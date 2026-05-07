export interface WalletDto {
  id: number;
  name: string;
  type: string;
  color: string;
  balance: number;
  currency: string;
  creditLine: number | null;
}
