import {
  Column,
  Entity,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAgent: string;

  @Column()
  acceptedLanguage: string;

  @Column()
  status: string;

  @Column()
  authToken: string;

  @Column()
  ipAdress: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
