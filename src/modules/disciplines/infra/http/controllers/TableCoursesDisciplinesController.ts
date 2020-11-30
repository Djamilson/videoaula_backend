import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TableCourseDisciplineService from '@modules/disciplines/services/TableCourseDisciplineService';

export default class TableCoursesDisciplinesController {
  public async index(req: Request, res: Response): Promise<Response> {

    const { course_id } = req.params;
    const listCoursesDisciplines = container.resolve(
      TableCourseDisciplineService,
    );

    const coursesDisciplines = await listCoursesDisciplines.execute({
      course_id,
    });

    return res.json(classToClass(coursesDisciplines));
  }
}
