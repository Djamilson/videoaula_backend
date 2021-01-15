import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ThemesCourseDisciplineIdService from '@modules/disciplines/services/ThemesCourseDisciplineIdService';

export default class ThemesClassController {
  public async index(request: Request, response: Response): Promise<Response> {
    const themesCourseDisciplineIdService = container.resolve(
      ThemesCourseDisciplineIdService,
    );

     const { course_discipline_id } = request.params;

    const themes = await themesCourseDisciplineIdService.execute({
      course_discipline_id,
    });

    return response.json(classToClass(themes));
  }
}
