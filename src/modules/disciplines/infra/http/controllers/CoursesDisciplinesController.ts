import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseDisciplineService from '@modules/disciplines/services/CreateCourseDisciplineService';
import ListDisciplineService from '@modules/disciplines/services/ListDisciplineService';

export default class CoursesDisciplinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;

    const listCoursesDiscipline = container.resolve(ListDisciplineService);

    const disciplines = await listCoursesDiscipline.execute({
      course_id,
    });

    return response.json(classToClass(disciplines));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { course_id, discipline_id } = req.body;

      const createCourseDiscipline = container.resolve(
        CreateCourseDisciplineService,
      );

      const newCourseDiscipline = await createCourseDiscipline.execute({
        course_id,
        discipline_id,
      });

      return res.json(newCourseDiscipline);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
