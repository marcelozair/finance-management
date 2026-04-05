import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletRepository } from '../../domain/interfaces/WalletRepository';
import { WalletMapper } from '../mappers/WalletMapper';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';
import { WalletBalanceService } from '../../domain/services/WalletBalanceService';
import { WalletTypes } from '../../domain/vo/WalletType';

export class GetWalletUseCase {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  /**
   * Get Wallets by profile account, with computed balance per wallet.
   * @param {number} profileId profile id
   * @returns {Promise<WalletDto[]>} list of wallets with calculated balance
   */
  async execute(profileId: number): Promise<WalletDto[]> {
    const wallets = await this.walletRepository.getAll(profileId);

    const response = await Promise.all(
      wallets.map(async (wallet) => {
        const transactions = await this.transactionRepository.findByWallet(
          wallet._id,
        );

        const balance = WalletBalanceService.calculate(
          wallet._id,
          wallet._type as WalletTypes,
          transactions,
        );

        return WalletMapper.toDTO(wallet, balance);
      }),
    );

    return response;
  }
}
