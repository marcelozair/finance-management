export interface CreateTransactionDto {
  type: string;
  date: string;
  amount: number;
  concept: string;
  category: string;
  destinationWalletId: number | null;
}
