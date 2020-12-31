import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Comment from '@modules/disciplines/infra/typeorm/entities/Comment';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('comments_answers')
class CommentAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment_answer: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column()
  comment_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default CommentAnswer;
