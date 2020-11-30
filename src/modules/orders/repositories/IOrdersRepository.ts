import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  findById(id: string): Promise<Order | undefined>;
  findAllOrdersToUserId(user_id: string): Promise<Order[] | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
}
