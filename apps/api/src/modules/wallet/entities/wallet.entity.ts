import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { RecordEntity } from 'src/modules/record/entities/record.entity';

export enum WalletTypeEnum {
  CASH = 'Cash',
  SAVE_ACCOUNT = 'Save Wallet',
  DEBIT_ACCOUNT = 'Debit Wallet',
}

@Entity('wallets')
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: WalletTypeEnum, type: 'enum' })
  walletType: WalletTypeEnum;

  @Column({ type: 'float' })
  initialBalance: number;

  @Column({ type: 'float' })
  currentBalance: number;

  @Column()
  color: string;

  @Column({ enum: CurrencyEnum, type: 'enum' })
  currency: CurrencyEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => RecordEntity, (record: RecordEntity) => record.wallet)
  records: RecordEntity[];

  @ManyToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.wallets)
  profile: ProfileEntity;
}
