import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePhoneService from '@modules/users/services/CreatePhoneService';

export default class PhonesController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      console.log('person_id:', req.user);

      const { prefix, number } = req.body;

      console.log('user:: ', prefix, number, user_id);
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
