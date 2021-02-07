import { inject, injectable } from 'tsyringe';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class FindTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    order_id,
  }: IRequest): Promise<Transaction | undefined> {
    const transaction = await this.transactionsRepository.findByOrderId(
      order_id,
    );

    return transaction;
  }
}

export default FindTransactionService;
