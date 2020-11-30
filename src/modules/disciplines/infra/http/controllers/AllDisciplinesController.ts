import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AllDisciplinesService from '@modules/disciplines/services/AllDisciplinesService';

export default class AllDisciplinesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listDisciplines = container.resolve(AllDisciplinesService);
    const disciplines = await listDisciplines.execute();

    return res.json(classToClass(disciplines));
  }
}
