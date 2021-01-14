import { Expose, Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import uploadConfig from '@config/upload';
import Comment from './Comment';
@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  movie: string;

  @OneToMany(() => Comment, comment => comment.movie)
  comments: Comment[];

  @Expose({ name: 'movie_url' })
  getAvatarUrl(): string | null {
    if (!this.movie) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.movie}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.movie}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Movie;
