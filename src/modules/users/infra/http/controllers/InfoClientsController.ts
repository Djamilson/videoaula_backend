import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/users/services/CreateAddressService';
import CreateListPhoneService from '@modules/users/services/CreateListPhoneService';
import UpdatePersonService from '@modules/users/services/UpdatePersonService';

export default class InfoPersonController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const {
        cpf,
        birdthDate,
        rg,
        rgss,
        street,
        number,
        complement,
        neighborhood,
        zip_code,
        city_id,
        phones,
      } = req.body;

      const createAddress = container.resolve(CreateAddressService);
      const updatePerson = container.resolve(UpdatePersonService);
      const createListPhone = container.resolve(CreateListPhoneService);

      console.log('req.body:: ', req.body);

      const { id: address_id } = await createAddress.execute({
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        user_id,
        city_id,
      });

      console.log('address_id::', address_id);

      const phone = await createListPhone.execute({
        phones,
        user_id,
      });

      const phone_id_man = phone[0].id;

      console.log('Meu phone::', phone[0].id);
      console.log('phone_id_man::', phone_id_man);

      const person = await updatePerson.execute({
        user_id,
        cpf,
        birdthDate,
        rg,
        rgss,
        address_id,
        phone_id_man,
      });

      return res.json(classToClass(person));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
