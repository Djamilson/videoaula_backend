import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AllDisciplinesService from '@modules/disciplines/services/AllDisciplinesService';

export default class AllDisciplinesController {
  public async index(req: Request, res: Response): Promise<Response> {
    console.log('Passou');
    const listDisciplines = container.resolve(AllDisciplinesService);
    console.log('Passou');
    const disciplines = await listDisciplines.execute();

    return res.json(classToClass(disciplines));
  }
}
