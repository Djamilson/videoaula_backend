import { Request, Response } from 'express';
import pagarme from 'pagarme';
import qs from 'qs';
import { container } from 'tsyringe';

import CancelTransactionService from '@modules/payments/services/CancelTransactionService';
import FindTransactionService from '@modules/payments/services/FindTransactionService';
import UpdateTransactionService from '@modules/payments/services/UpdateTransactionService';

export default class TransactionsCardController {
  public async update(request: Request, response: Response): Promise<Response> {
    console.log('Myslldkflkdlk ===>>> ', request);

    // const signature = request.headers['x-hub-signature'].replace('sha1=', '');

    const { payload } = request.body;
    console.log('response=>>>>>>', response);
    console.log('Payload:::::::::: ', payload);
    console.log('My payload:', payload);
    const updateTransaction = container.resolve(UpdateTransactionService);
    /*
    const customer = await updateTransaction.execute({
      user_id,
      fee,
      courses,
      card_hash,
      installments,
    }); */

    console.log('Finalizaou');

    return response.json(payload);
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
