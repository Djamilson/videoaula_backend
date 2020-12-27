import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCourseImageService from '@modules/courses/services/UpdateCourseImageService';

export default class CourseImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateCourseImage = container.resolve(UpdateCourseImageService);

    const { id } = req.body;

    const user = await updateCourseImage.execute({
      course_id: id,
      imageFilename: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
