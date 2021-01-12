import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListGroupByNameService from '@modules/users/services/ListGroupByNameService';

import AppError from '@shared/errors/AppError';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, nameGroup } = req.body;

      const createUser = container.resolve(CreateUserService);
      const listGroupByNameService = container.resolve(ListGroupByNameService);

      const groupExist = await listGroupByNameService.execute(nameGroup);

      if (!groupExist) {
        throw new AppError('There not find any group with the givan id');
      }

      const groups = [{ id: groupExist.id }];

      const user = await createUser.execute({
        name,
        email,
        password,
        groups,
      });

      return res.json(classToClass(user));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
