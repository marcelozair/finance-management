import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { ProfileEntity } from './ProfileEntity';
import { TransactionEntity } from './TransactionEntity';
import { CurrencyEnum } from '../../../shared/constant/CurrencyEnum';
import { WalletTypes } from '../../../modules/wallets/domain/vo/WalletType';

@Entity({ schema: 'finance', name: 'mad_wallets' })
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: WalletTypes, type: 'enum' })
  type: string;

  @Column()
  color: string;

  @Column({ enum: CurrencyEnum, type: 'enum' })
  currency: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  creditLine?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(
    () => TransactionEntity,
    (transaction: TransactionEntity) => transaction.wallet,
  )
  records: TransactionEntity[];

  @Column()
  profileId: number; // The physical column

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity; // The virtual relation
}
