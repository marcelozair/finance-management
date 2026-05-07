import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { SubCategoryEntity } from './SubCategoryEntity';
import { TransactionEntity } from './TransactionEntity';

@Entity({ schema: 'finance', name: 'cat_categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  iconName: string;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategories: SubCategoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.category)
  transactions: TransactionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
