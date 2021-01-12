import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisciplineService from '@modules/disciplines/services/CreateDisciplineService';
import FindDisciplineService from '@modules/disciplines/services/FindDisciplineService';
import ListDisciplinesAllService from '@modules/disciplines/services/ListDisciplinesAllService';
import UpdateDisciplineService from '@modules/disciplines/services/UpdateDisciplineService';

export default class DisciplinesController {
  public async show(request: Request, res: Response): Promise<Response> {
    const { id } = request.params;

    const findDiscipline = container.resolve(FindDisciplineService);

    const discipline = await findDiscipline.execute({ id });

    return res.json(classToClass(discipline));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDisciplinesAll = container.resolve(ListDisciplinesAllService);

    const disciplines = await listDisciplinesAll.execute();

    return response.json(classToClass(disciplines));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const createDiscipline = container.resolve(CreateDisciplineService);

      const discipline = await createDiscipline.execute({
        name,
      });

      return res.json(classToClass(discipline));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name } = req.body;
      const updateDiscipline = container.resolve(UpdateDisciplineService);

      const discipline = await updateDiscipline.execute({
        id,
        name,
      });

      return res.json(classToClass(discipline));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
