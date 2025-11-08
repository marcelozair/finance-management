import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';

export enum RecordTypeEnum {
  Transfer = 'Transfer',
  Income = 'Income',
  Expense = 'Expense',
}

export enum RecordCategoryEnum {
  Rent = 'Rent',
  Utilities = 'Utilities',
  Transport = 'Transport',
  Travel = 'Travel',
  Food = 'Food',
  Groceries = 'Groceries',
  Health = 'Health',
  Entertainment = 'Entertainment',
  Education = 'Education',
  House = 'House',
  Salary = 'Salary',
  Investment = 'Investment',
  Gift = 'Gift',
  Transfer = 'Transfer',
  Insurance = 'Insurance',
  Pets = 'Pets',
  Clothing = 'Clothing',
  Beauty = 'Beauty',
  Subscriptions = 'Subscriptions',
  Donations = 'Donations',
  Childcare = 'Childcare',
  Phone = 'Phone',
  Internet = 'Internet',
  Savings = 'Savings',
  Business = 'Business',
  Taxes = 'Taxes',
  Loan = 'Loan',
  Fees = 'Fees',
  Bonus = 'Bonus',
  Reimbursement = 'Reimbursement',
  Freelance = 'Freelance',
  Other = 'Other',
}

@Entity('records')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concept: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  category: RecordCategoryEnum;

  @Column()
  type: RecordTypeEnum;

  @OneToMany(() => WalletEntity, (wallet: WalletEntity) => wallet.records)
  wallet: WalletEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
