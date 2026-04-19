import { CategoryDto } from './CategoryDto';
import { SubCategoryDto } from './SubCategoryDto';

export interface TransactionDTO {
  id: number;
  type: string;
  amount: number;
  concept: string;
  walletId: number;
  category: CategoryDto | null;
  subCategory: SubCategoryDto | null;
  destinationWalletId: number | null;
}
