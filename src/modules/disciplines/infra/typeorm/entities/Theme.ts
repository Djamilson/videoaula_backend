import { Expose, Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import CourseDiscipline from './CourseDiscipline';
import Movie from './Movie';

@Entity('themes')
class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  theme: string;

  @Column()
  movie_id: string;

  @OneToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  course_discipline_id: string;

  @OneToOne(() => CourseDiscipline, courseDiscipline => courseDiscipline.themes)
  @JoinColumn({ name: 'course_discipline_id' })
  course_discipline: CourseDiscipline;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Theme;
