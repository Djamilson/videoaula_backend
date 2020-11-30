import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import CourseDiscipline from './CourseDiscipline';
import Movie from './Movie';

@Entity('disciplines')
class Discipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => CourseDiscipline,
    course_discipline => course_discipline.discipline,
  )
  course_disciplines: CourseDiscipline[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Discipline;
