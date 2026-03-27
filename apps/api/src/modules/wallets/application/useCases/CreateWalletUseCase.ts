import { Wallet } from '../../domain/entities/Wallet';
import { WalletRepository } from '../../domain/interfaces/WalletRepository';
import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { WalletName } from '../../domain/vo/WalletName';
import { CreateWalletDTO } from '../../presentation/dtos/CreateWalletDto';

export class CreateWalletUseCase {
  constructor(private readonly walletRepository: WalletRepository) {}

  /**
   * Create Wallet into user profile account
   * @param {number} profileId user credentials
   * @param {CreateWalletDTO} wallet user credentials
   * @returns {Promise<CreateWalletDTO>} user payload and authorization
   */
  async execute(profileId: number, wallet: CreateWalletDTO): Promise<Wallet> {
    const newWallet = Wallet.forCreate(
      new WalletName(wallet.name),
      wallet.walletType,
      new Amount(wallet.initialBalance),
      new Currency(wallet.currency),
      wallet.color,
    );

    const createdWallet = await this.walletRepository.save(
      profileId,
      newWallet,
    );

    return createdWallet;
  }
}
