import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CancelTransactionService from '@modules/payments/services/CancelTransactionService';
import FindTransactionService from '@modules/payments/services/FindTransactionService';

export default class TransactionsBoletoController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log('Myslldkflkdlk');
    return response.json({ transaction: true });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const findTransaction = container.resolve(FindTransactionService);

    const transaction = await findTransaction.execute({
      order_id,
    });

    return response.json(transaction);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const cancelTransaction = container.resolve(CancelTransactionService);

    const transaction = await cancelTransaction.execute({ id });

    return response.json(transaction);
  }
}
