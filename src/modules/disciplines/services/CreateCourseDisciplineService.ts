import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';
import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';

interface IRequest {
  course_id: string;
  discipline_id: string;
}

@injectable()
class CreateCourseDisciplineService {
  constructor(
    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    course_id,
    discipline_id,
  }: IRequest): Promise<CourseDiscipline> {
    console.log(' execute:: ', course_id, discipline_id);

    const checkCourseDisciplineExists = await this.coursesDisciplinesRepository.findByCourseDiscipline(
      course_id,
      discipline_id,
    );

    if (checkCourseDisciplineExists) {
      throw new AppError('CourseDiscipline already used.');
    }

    const courseDiscipline = this.coursesDisciplinesRepository.create({
      course_id,
      discipline_id,
    });

    return courseDiscipline;
  }
}

export default CreateCourseDisciplineService;
