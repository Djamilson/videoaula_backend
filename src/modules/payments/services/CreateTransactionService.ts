import { injectable, inject } from 'tsyringe';

import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    transaction_id,
    status,
    authorization_code,
    brand,
    authorized_amount,
    tid,
    installments,
    order_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      transaction_id,
      status,
      authorization_code,
      brand,
      authorized_amount,
      tid,
      installments,
      order_id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
