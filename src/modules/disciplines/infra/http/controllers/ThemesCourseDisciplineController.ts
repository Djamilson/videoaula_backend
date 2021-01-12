import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ThemesAllCourseDisciplineIdService from '@modules/disciplines/services/ThemesAllCourseDisciplineIdService';

export default class ThemesCourseDisciplineController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { course_id, discipline_id } = request.params;

    const themesAllCourseDisciplineIdService = container.resolve(
      ThemesAllCourseDisciplineIdService,
    );

    const themes = await themesAllCourseDisciplineIdService.execute({
      course_id,
      discipline_id,
    });

    return response.json(classToClass(themes));
  }
}
