export interface CreateTransactionDto {
  amount: number;
  concept: string;
  type: string;
  category: string;
  destinationWalletId: number | null;
}
