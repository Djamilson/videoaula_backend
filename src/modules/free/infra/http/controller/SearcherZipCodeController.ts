import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FeeService from '@modules/free/services/SearcherAddressService';

export default class SearcherZipCodeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { zip_code } = request.params;
    /*
    const correios = new Correios();
    try {
      const data = await correios.consultaCEP({ cep: '77018452' });
      return response.json(data);
    } catch (err) {
      console.log(err);
      return response.status(401).json({ erro: 'Erro' });
    }
    */
    const searcherZipCode = container.resolve(FeeService);

    const data = await searcherZipCode.execute({
      zip_code,
    });

    return response.json(data);
  }
}
