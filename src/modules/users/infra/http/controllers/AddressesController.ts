import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/users/services/CreateAddressService';
import ListAddressesService from '@modules/users/services/ListAddressesService';

export default class AddressesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listAddresses = container.resolve(ListAddressesService);

    const addresses = await listAddresses.execute(user_id);

    return res.json(classToClass(addresses));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      console.log('person_id:', req.user);

      const {
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        city_id,
      } = req.body;

      console.log(
        'user:: ',
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        city_id,
        user_id,
      );
      const createAddress = container.resolve(CreateAddressService);
      // const createUserGroups = container.resolve(CreateUserGroupsService);

      const address = await createAddress.execute({
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        user_id,
        city_id,
      });
      return res.json(classToClass(address));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
