import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { Wallet } from '../../domain/entities/Wallet';
import { WalletMapper } from '../mappers/WalletMapper';
import { WalletName } from '../../domain/vo/WalletName';
import { WalletType } from '../../domain/vo/WalletType';
import { WalletColor } from '../../domain/vo/WalletColor';
import { WalletDto } from '../../presentation/dtos/WalletDto';
import { CreateWalletDTO } from '../../presentation/dtos/CreateWalletDto';
import { WalletRepository } from '../../domain/interfaces/WalletRepository';
import { TransactionRepository } from '../../../transactions/domain/interfaces/TransactionRepository';

export class CreateWalletUseCase {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  /**
   * Create Wallet into user profile account
   * @param {number} profileId user credentials
   * @param {CreateWalletDTO} wallet user credentials
   * @returns {Promise<CreateWalletDTO>} user payload and authorization
   */
  async execute(
    profileId: number,
    wallet: CreateWalletDTO,
  ): Promise<WalletDto> {
    const newWallet = Wallet.forCreate(
      new WalletName(wallet.name),
      new WalletType(wallet.walletType),
      new Currency(wallet.currency),
      new WalletColor(wallet.color),
      wallet.creditLine ? new Amount(wallet.creditLine) : null,
    );

    const createdWallet = await this.walletRepository.save(
      profileId,
      newWallet,
    );

    if (wallet.initialBalance > 0) {
      await this.transactionRepository.initialTransaction(
        createdWallet._id,
        new Amount(wallet.initialBalance),
      );
    }

    const resultWallet = new Wallet(
      createdWallet._id,
      new WalletName(createdWallet._name),
      new WalletType(createdWallet._type),
      new Currency(createdWallet._currency),
      new Amount(wallet.initialBalance),
      new WalletColor(createdWallet._color),
      wallet.creditLine ? new Amount(wallet.creditLine) : null,
    );

    return WalletMapper.toDTO(resultWallet);
  }
}
