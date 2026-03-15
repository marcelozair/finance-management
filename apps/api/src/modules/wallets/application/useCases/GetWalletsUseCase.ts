import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletRepository } from '../../domain/interfaces/WalletRepository';
import { WalletMapper } from '../mappers/WalletMapper';

export class GetWalletUseCase {
  constructor(private readonly walletRepository: WalletRepository) {}

  /**
   * Get Wallets by profile account
   * @param {number} profileId profile id
   * @returns {Promise<WalletDto[]>} user payload and authorization
   */
  async execute(profileId: number): Promise<WalletDto[]> {
    const wallets = await this.walletRepository.getAll(profileId);
    const response = wallets.map((wallet) => WalletMapper.toDTO(wallet));
    return response;
  }
}
