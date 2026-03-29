import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubmissionEntity } from '../submission/submission.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  title!: string;

  @Column({ unique: true })
  joinCode!: string;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assignmentFileName!: string | null;

  @Column({ type: 'text', nullable: true })
  assignmentText!: string | null;

  @OneToMany(() => SubmissionEntity, (s) => s.session)
  submissions!: SubmissionEntity[];
}

