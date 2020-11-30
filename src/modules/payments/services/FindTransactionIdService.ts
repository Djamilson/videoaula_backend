import { inject, injectable } from 'tsyringe';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindTransactionIdService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Transaction | undefined> {
    const transaction = await this.transactionsRepository.findById(id);

    return transaction;
  }
}

export default FindTransactionIdService;
