import {
  Column,
  Entity,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProfileEntity } from './ProfileEntity';

@Entity({ schema: 'core', name: 'mad_users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 80 })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  secret: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ProfileEntity, (profile: ProfileEntity) => profile.user)
  profiles: ProfileEntity[];
}
