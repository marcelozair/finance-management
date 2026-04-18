export interface TransactionDTO {
  id: number;
  walletId: number;
  amount: number;
  formattedAmount: string;
  concept: string;
  type: string;
  category: string;
  destinationWalletId: number | null;
}
