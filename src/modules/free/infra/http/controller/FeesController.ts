import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FeeService from '@modules/free/services/FeeService';

export default class FeesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { zip_code } = request.params;
    /**
1 = Formato caixa/pacote
2 = Formato rolo/prisma
3 = Envelope */

    /*
    04014 = SEDEX à vista
    04510 = PAC à vista
    04065 = SEDEX à vista pagamento na entrega
    04707 = PAC à vista pagamento na entrega
    40169 = SEDEX12 ( à vista e a faturar)
    40215 = SEDEX 10 (à vista e a faturar)
    40290 = SEDEX Hoje Varejo
    */

    const user_id = request.user.id;

    const calcFee = container.resolve(FeeService);

    const fee = await calcFee.execute({
      user_id,
    });

    return response.json(fee);
  }
}
