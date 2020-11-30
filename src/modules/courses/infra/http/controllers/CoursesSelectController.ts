import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCoursesService from '@modules/courses/services/ListCoursesSelectService';

export default class CoursesSelectController {
  public async index(req: Request, res: Response): Promise<Response> {
    console.log("Entrou ===>")

    const listCourses = container.resolve(ListCoursesService);
    const courses = await listCourses.execute();

    return res.json(classToClass(courses));
  }
}
