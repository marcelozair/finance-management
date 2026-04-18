import { I18nService } from 'nestjs-i18n';

import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { Wallet } from '../../domain/entities/Wallet';
import { WalletMapper } from '../mappers/WalletMapper';
import { WalletName } from '../../domain/vo/WalletName';
import { WalletType } from '../../domain/vo/WalletType';
import { WalletColor } from '../../domain/vo/WalletColor';
import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletRepository } from '../../domain/interfaces/WalletRepository';
import { WalletBalanceService } from '../../domain/services/WalletBalanceService';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';

export class GetWalletUseCase {
  constructor(
    private readonly i18n: I18nService,
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  /**
   * Get Wallets by profile id.
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
          wallet._type,
          transactions,
        );

        return WalletMapper.toDTO(
          new Wallet(
            wallet._id,
            new WalletName(wallet._name),
            new WalletType(wallet._type),
            new Currency(wallet._currency),
            new Amount(balance),
            new WalletColor(wallet._color),
          ),
        );
      }),
    );

    return response;
  }
}
