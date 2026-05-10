// import { TransferTransaction } from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';

export class DeleteTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Delete Transactions by wallet id and transaction id.
   * @param {number} walletId wallet id
   * @param {number} transactionId transaction id
   * @returns {Promise<void>} void
   */
  async execute(walletId: number, transactionId: number): Promise<void> {
    // #TODO Critical apply transactions
    try {
      const transaction =
        await this.transactionRepository.findById(transactionId);

      if (!transaction) throw new Error('Transaction not found');

      console.log(`Removing the transaction ${transaction._id}`);
      const response = await this.transactionRepository.deleteById(
        transaction._id,
      );

      if (!response) {
        throw new Error('Transaction not found or could not be deleted');
      }

      // if (
      //   transaction._type === TransferTransaction &&
      //   transaction._destinationWalletId
      // ) {
      //   console.log(
      //     `Removing the transaction ${transaction._destinationWalletId}`,
      //   );
      //   const response = await this.transactionRepository.deleteById(
      //     transaction._destinationWalletId,
      //   );

      //   if (!response) {
      //     throw new Error('Transaction not found or could not be deleted');
      //   }
      // }
    } catch (error) {
      console.log('Error deleting transaction:', error);
      throw error;
    }
  }
}
