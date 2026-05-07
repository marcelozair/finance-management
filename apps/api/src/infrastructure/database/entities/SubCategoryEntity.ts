import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { TransactionEntity } from './TransactionEntity';

@Entity({ schema: 'finance', name: 'cat_sub_categories' })
export class SubCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconName: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.subCategory)
  transactions: TransactionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
