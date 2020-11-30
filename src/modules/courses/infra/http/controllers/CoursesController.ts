import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseService from '@modules/courses/services/CreateCourseService';
import FindCourseService from '@modules/courses/services/FindCourseService';
import ListCoursesService from '@modules/courses/services/ListCoursesService';

export default class CoursesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCourse = container.resolve(FindCourseService);

    const course = await findCourse.execute({ id });

    return response.json(course);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.body;

    const listCourses = container.resolve(ListCoursesService);

    const courses = await listCourses.execute({
      page,
      limit,
    });

    return res.json(classToClass(courses));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, stock } = req.body;

      const { filename: image } = req.file;

      console.log('=>>>:', name, price, stock);
      console.log('image::', image);
      const createCourse = container.resolve(CreateCourseService);
      // dependencia

      const course = await createCourse.execute({
        name,
        price,
        image,
        stock,
      });

      console.log('fim:::');

      return res.json(classToClass(course));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
