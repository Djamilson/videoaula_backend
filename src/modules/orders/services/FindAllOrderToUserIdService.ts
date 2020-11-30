import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class FindAllOrderToUserIdService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order[] | undefined> {
    const orders = await this.ordersRepository.findAllOrdersToUserId(user_id);

    return orders;
  }
}

export default FindAllOrderToUserIdService;
