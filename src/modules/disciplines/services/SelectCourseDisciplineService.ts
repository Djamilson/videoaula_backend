import { inject, injectable } from 'tsyringe';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';

interface ICourseDiscipline {
  value: string;
  label: string;
}

interface IRequest {
  course_id: string;
}

@injectable()
class SelectCourseDisciplineService {
  constructor(
    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    course_id,
  }: IRequest): Promise<ICourseDiscipline[] | undefined> {
    const listCoursesDisciplines = await this.coursesDisciplinesRepository.findSelectDiscipline(
      course_id,
    );

    const options = listCoursesDisciplines?.map(courseDiscipline => ({
      value: courseDiscipline.discipline_id,
      label: courseDiscipline.discipline.name,
    }));

    return options;
  }
}

export default SelectCourseDisciplineService;
