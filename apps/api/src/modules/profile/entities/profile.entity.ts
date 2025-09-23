import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  color: string;

  @Column({ enum: CurrencyEnum, type: 'enum' })
  currency: CurrencyEnum;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.profiles)
  user: UserEntity;

  @OneToMany(() => WalletEntity, (wallet: WalletEntity) => wallet.profile)
  wallets: WalletEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
