import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderBoletoService from '@modules/orders/services/CreateOrderBoletoService';

export default class OrdersBoletoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    console.log('request.body::===>>', request.body);
    const { courses, fee, installments } = request.body;

    const createOrderBoleto = container.resolve(CreateOrderBoletoService);

    const customerBoleto = await createOrderBoleto.execute({
      user_id,
      fee,
      courses,
      installments,
    });

    console.log('My Boleto:::', customerBoleto);

    return response.json(customerBoleto);
  }
}
