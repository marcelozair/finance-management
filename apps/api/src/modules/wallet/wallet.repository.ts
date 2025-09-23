import { Inject, Injectable } from '@nestjs/common';

import {
  WalletRepositoryEntity,
  WalletRepositoryName,
} from './entities/wallet.provider';
import { WalletEntity } from './entities/wallet.entity';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Injectable()
export class WalletRepository {
  @Inject(WalletRepositoryName)
  private readonly walletRepository: WalletRepositoryEntity;

  create(wallet: Partial<WalletEntity>): Promise<WalletEntity> {
    const walletPayload = this.walletRepository.create({ ...wallet });
    return this.walletRepository.save(walletPayload);
  }

  findById(walletId: number): Promise<WalletEntity | null> {
    return this.walletRepository.findOne({ where: { id: walletId } });
  }

  getAll(profile: ProfileEntity): Promise<WalletEntity[]> {
    return this.walletRepository.find({ where: { profile: profile } });
  }
}
