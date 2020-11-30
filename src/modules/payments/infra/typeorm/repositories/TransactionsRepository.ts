import { getRepository, Repository } from 'typeorm';

import ICreateTransactionDTO from '@modules/payments/dtos/ICreateTransactionDTO';
import ITransactionsRepository from '@modules/payments/repositories/ITransactionsRepository';

import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne(id);

    return transaction;
  }

  public async findByOrderId(
    order_id: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({
      where: { order_id },
      relations: ['order'],
    });

    return transaction;
  }

  public async create(
    transaction: ICreateTransactionDTO,
  ): Promise<Transaction> {
    const newTransaction = this.ormRepository.create(transaction);

    await this.ormRepository.save(newTransaction);

    return newTransaction;
  }

  public async destroy(transaction_id: string): Promise<Transaction> {
    const newTransaction = this.ormRepository.create({ transaction_id });

    await this.ormRepository.save(newTransaction);

    return newTransaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }
}

export default TransactionsRepository;
