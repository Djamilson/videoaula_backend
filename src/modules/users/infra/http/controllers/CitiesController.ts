import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCitiesService from '@modules/users/services/ListCitiesService';

export default class CitiesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { state_id } = req.params;

    console.log('==> 1', state_id);
    const listCities = container.resolve(ListCitiesService);
    console.log('==> 2', state_id);
    const cities = await listCities.execute(state_id);

    return res.json(classToClass(cities));
  }
}
