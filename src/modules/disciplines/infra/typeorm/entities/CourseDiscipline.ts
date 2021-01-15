import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import Course from '@modules/courses/infra/typeorm/entities/Course';

import Discipline from './Discipline';
import Theme from './Theme';

@Entity('courses_disciplines')
class CourseDiscipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Discipline, discipline => discipline.course_disciplines)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @ManyToOne(() => Course, course => course.course_disciplines)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Theme, theme => theme.course_discipline)
  themes: Theme[];

  @Column()
  course_id: string;

  @Column()
  discipline_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default CourseDiscipline;
