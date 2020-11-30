import { inject, injectable } from 'tsyringe';

import ICoursesRepository from '../repositories/ICoursesRepository';

interface ICourse {
  value: string;
  label: string;
}

@injectable()
class ListCoursesSelectService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<ICourse[] | undefined> {
    const listCourses = await this.coursesRepository.findAllBy();

    const options = listCourses?.map(course => ({
      value: course.id,
      label: course.name,
    }));

    return options;
  }
}

export default ListCoursesSelectService;
