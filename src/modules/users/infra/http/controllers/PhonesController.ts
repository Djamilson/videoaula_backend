import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePhoneService from '@modules/users/services/CreatePhoneService';
import ListPhonesService from '@modules/users/services/ListPhonesService';

export default class PhonesController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const phones = container.resolve(ListPhonesService);

      const phone = await phones.execute({
        user_id,
      });
      return res.json(classToClass(phone));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { prefix, number } = req.body;
      console.log('req.body:: ', req.body);

      const createPhone = container.resolve(CreatePhoneService);

      const phone = await createPhone.execute({
        prefix,
        number,
        user_id,
      });
      return res.json(classToClass(phone));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
