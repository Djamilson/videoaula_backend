import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SelectCourseDisciplineService from '@modules/disciplines/services/SelectCourseDisciplineService';

export default class SelectCoursesDisciplinesController {
  public async index(req: Request, res: Response): Promise<Response> {

    const { course_id } = req.params;
    const listCoursesDisciplines = container.resolve(
      SelectCourseDisciplineService,
    );

    const coursesDisciplines = await listCoursesDisciplines.execute({
      course_id,
    });

    return res.json(classToClass(coursesDisciplines));
  }
}
