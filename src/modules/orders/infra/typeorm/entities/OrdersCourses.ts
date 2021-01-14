import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Course from '@modules/courses/infra/typeorm/entities/Course';

@Entity('orders_courses')
class OrdersCourses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_courses)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Course, course => course.order_courses)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column()
  course_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column()
  order_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersCourses;
