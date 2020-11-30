import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import uploadConfig from '@config/upload';
import CourseDiscipline from '@modules/disciplines/infra/typeorm/entities/CourseDiscipline';
import OrdersCourses from '@modules/orders/infra/typeorm/entities/OrdersCourses';

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @OneToMany(() => OrdersCourses, order_courses => order_courses.course)
  order_courses: OrdersCourses[];

  @OneToMany(
    () => CourseDiscipline,
    course_discipline => course_discipline.course,
  )
  course_disciplines: CourseDiscipline[];

  @Column()
  stock: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getAvatarUrl(): string | null {
    if (!this.image) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }
}

export default Course;
