import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  tid: string;
}

@injectable()
class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ tid }: IRequest): Promise<Transaction> {
    const transactionExist = await this.transactionsRepository.findById(tid);

    if (!transactionExist) {
      throw new AppError('Course not found');
    }

    transactionExist.status = 'foi alterado';

    return this.transactionsRepository.save(transactionExist);
  }
}

export default UpdateTransactionService;
