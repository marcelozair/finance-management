import { Inject, Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { WalletEntity } from './entities/wallet.entity';
import { CreateWalletDTO } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  @Inject(WalletRepository)
  private readonly walletRepository: WalletRepository;

  async create(
    wallet: CreateWalletDTO,
    profile: ProfileEntity,
  ): Promise<WalletEntity> {
    const newWallet = await this.walletRepository.create({
      ...wallet,
      profile: profile,
      currentBalance: wallet.initialBalance,
    });

    return newWallet;
  }

  async getAll(profile: ProfileEntity): Promise<WalletEntity[]> {
    return await this.walletRepository.getAll(profile);
  }
}
