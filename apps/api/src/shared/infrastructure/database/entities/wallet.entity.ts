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

import { ProfileEntity } from './profile.entity';
import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { WalletTypes } from 'src/modules/wallets/domain/vo/WalletType';
import { TransactionEntity } from './transaction.entity';

@Entity('wallets')
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
