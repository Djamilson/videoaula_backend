import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id: string;
}
interface ICourse {
  order_created_at: Date;
  id: string;
  course_id: string;
  subtotal: string;
  order_id: string;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  course: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
}

@injectable()
class GetOrderCourseUserIdService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<ICourse[] | undefined> {
    const orders = await this.ordersRepository.findAllOrdersToUserId(user_id);

    const serializabled = [] as ICourse[];

    orders?.map((order: Order) => {
      order.order_courses.map((course: any) => {
        serializabled.push({ ...course });
      });
    });

    return serializabled;
  }
}

export default GetOrderCourseUserIdService;
