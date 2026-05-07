export interface TransactionDTO {
  id: number;
  type: string;
  amount: number;
  concept: string;
  walletId: number;
  category: string;
  destinationWalletId: number | null;
}

// export interface CreateWalletPayload {
//   name: string;
//   walletType: string;
//   initialBalance: number;
//   currency: string;
//   color: string;
// }
