import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WalletEntity } from '../entities/wallet.entity';
import { Wallet } from 'src/modules/wallets/domain/entities/Wallet';
import { WalletMapper } from 'src/modules/wallets/application/mappers/WalletMapper';
import { WalletRepository } from 'src/modules/wallets/domain/interfaces/WalletRepository';

@Injectable()
export class WalletRepositoryImpl implements WalletRepository {
  @InjectRepository(WalletEntity)
  private readonly repository: Repository<WalletEntity>;

  async save(profileId: number, wallet: Wallet): Promise<Wallet> {
    const walletPayload = this.repository.create({
      name: wallet._name,
      color: wallet._color,
      currency: wallet._currency,
      walletType: wallet._walletType,
      initialBalance: wallet._initialBalance,
      currentBalance: wallet._currentBalance,
      // Create Reference for profile
      profileId,
    });

    const userEntity = await this.repository.save(walletPayload);
    return WalletMapper.entityToDomain(userEntity);
  }

  async getAll(profileId: number): Promise<Wallet[]> {
    const wallets = await this.repository.find({
      where: { profileId: profileId },
    });

    return wallets.map((wallet) => WalletMapper.entityToDomain(wallet));
  }
}
