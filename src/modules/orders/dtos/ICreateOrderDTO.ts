import User from '@modules/users/infra/typeorm/entities/User';

interface ICourse {
  course_id: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default interface ICreateOrderDTO {
  user: User;
  courses: ICourse[];
  total: number;
  fee: number;
}
