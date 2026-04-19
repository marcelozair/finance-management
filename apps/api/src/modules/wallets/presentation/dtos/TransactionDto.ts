export interface TransactionDTO {
  id: number;
  type: string;
  amount: number;
  concept: string;
  walletId: number;
  category: string;
  destinationWalletId: number | null;
}
