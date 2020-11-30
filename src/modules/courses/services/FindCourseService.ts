import { inject, injectable } from 'tsyringe';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Course | undefined> {
    const course = await this.coursesRepository.findById(id);

    return course;
  }
}

export default FindCourseService;
