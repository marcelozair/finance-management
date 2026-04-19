import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { WalletEntity } from './WalletEntity';
import { TransactionEnum } from 'src/modules/transactions/domain/vo/TransactionType';
import { CategoryEntity } from './CategoryEntity';
import { SubCategoryEntity } from './SubCategoryEntity';

@Entity({ schema: 'finance', name: 'mad_transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column()
  concept: string;

  @Column({
    type: 'enum',
    enum: TransactionEnum,
  })
  type: string;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.transactions)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column({ nullable: true })
  subCategoryId: number;

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.transactions)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategoryEntity;

  /**
   * Source Wallet: Every transaction must belong to a wallet.
   */
  @Column()
  walletId: number;

  @ManyToOne(() => WalletEntity)
  @JoinColumn({ name: 'walletId' })
  wallet: WalletEntity;

  /**
   * Destination Wallet: Only populated for 'TRANSFER' type movements.
   * This allows us to link two wallets in a single logical operation.
   */
  @Column({ nullable: true })
  destinationWalletId: number;

  @ManyToOne(() => WalletEntity, { nullable: true })
  @JoinColumn({ name: 'destinationWalletId' })
  destinationWallet: WalletEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
