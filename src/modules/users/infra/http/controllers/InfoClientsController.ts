import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/users/services/CreateAddressService';
import CreatePhoneService from '@modules/users/services/CreatePhoneService';
import UpdatePersonService from '@modules/users/services/UpdatePersonService';

export default class InfoClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { documents, address, phone } = req.body;

      const createAddress = container.resolve(CreateAddressService);
      const updatePerson = container.resolve(UpdatePersonService);
      const createPhone = container.resolve(CreatePhoneService);

      console.log('req.body:: ', req.body);

      const { id: address_id_main } = await createAddress.execute({
        ...address,
        user_id,
      });

      const { id: phone_id_man } = await createPhone.execute({
        ...phone,
        user_id,
      });

      console.log('phone_id_man::', phone_id_man);

      const person = await updatePerson.execute({
        user_id,
        ...documents,
        address_id_main,
        phone_id_man,
      });
      console.log('Salvaou tudo ::', person);

      return res.json(classToClass(person));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
