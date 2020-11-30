import { inject, injectable } from 'tsyringe';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';

interface ICourseDiscipline {
  disciplineId: string;
  cursoDisciplineId: string;
  label: string;
}

interface IRequest {
  course_id: string;
}

@injectable()
class TableCourseDisciplineService {
  constructor(
    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    course_id,
  }: IRequest): Promise<ICourseDiscipline[] | undefined> {
    const listCoursesDisciplines = await this.coursesDisciplinesRepository.findTableDiscipline(
      course_id,
    );

    const options = listCoursesDisciplines?.map(courseDiscipline => ({
      cursoDisciplineId: courseDiscipline.id,
      disciplineId: courseDiscipline.discipline.id,
      label: courseDiscipline.discipline.name,
    }));

    return options;
  }
}

export default TableCourseDisciplineService;
