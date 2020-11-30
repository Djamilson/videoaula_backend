import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListStatesService from '@modules/users/services/ListStatesService';

export default class StatesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listStates = container.resolve(ListStatesService);
    const states = await listStates.execute();

    return res.json(classToClass(states));
  }
}
