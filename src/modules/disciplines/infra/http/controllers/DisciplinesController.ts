import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDisciplineService from '@modules/disciplines/services/CreateDisciplineService';
import UpdateDisciplineService from '@modules/disciplines/services/UpdateDisciplineService';

import ListDisciplinesAllService from '@modules/disciplines/services/ListDisciplinesAllService';

export default class DisciplinesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { zip_code } = request.params;

    const user_id = request.user.id;

    return response.json({ fee: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    console.log('Testst:');

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
