import pagarme from 'pagarme';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface ITransaction {
  id: string;
}

@injectable()
class CancelTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: ITransaction): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new AppError('Transaction not found');
    }

    console.log('Init transaction:>>>> ');

    try {
      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      const { transaction_id } = transaction;

      await client.transactions.refund({
        id: transaction_id,
      });

      console.log('Fez a Transaction', transaction_id);
    } catch (error) {
      console.log('VVV:', error);
    }

    console.log('vou fazer a update');

    transaction.order.canceled_at = new Date();

    await this.ordersRepository.save(transaction.order);
    console.log('fez a update ==>>');

    transaction.status = 'refund';

    return this.transactionsRepository.save(transaction);
  }
}

export default CancelTransactionService;
