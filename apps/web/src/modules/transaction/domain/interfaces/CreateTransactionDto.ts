export interface CreateTransactionDto {
  type: string;
  amount: number;
  concept: string;
  categoryId: number;
  subCategoryId: number;
  date: string;
  destinationWalletId: number | null;
}
