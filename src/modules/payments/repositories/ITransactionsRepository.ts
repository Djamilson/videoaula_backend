import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionsRepository {
  findById(id: string): Promise<Transaction | undefined>;
  findByOrderId(order_id: string): Promise<Transaction | undefined>;
  destroy(transaction_id: string): Promise<Transaction>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
}
