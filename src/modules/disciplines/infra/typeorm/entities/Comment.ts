import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import CommentAnswer from './CommentAnswer';
import Movie from './Movie';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Movie, movie => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  movie_id: string;

  @OneToMany(() => CommentAnswer, commentAnswer => commentAnswer.comment)
  comment_answers: CommentAnswer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Comment;
