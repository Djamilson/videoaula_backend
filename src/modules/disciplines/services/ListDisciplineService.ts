import { injectable, inject } from 'tsyringe';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';

interface IRequest {
  course_id: string;
}

interface IDiscipline {
  course_discipline_id: string;
  discipline_id: string;
  name: string;
}

@injectable()
class ListCourseDisciplineService {
  constructor(
    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    course_id,
  }: IRequest): Promise<IDiscipline[] | undefined> {
    const coursesDisciplines = await this.coursesDisciplinesRepository.findAllToCourseId(
      course_id,
    );

    const newList = coursesDisciplines?.map(p => {
      return {
        course_discipline_id: p.id,
        discipline_id: p.discipline.id,
        name: p.discipline.name,
      };
    });

    const uniqList = newList?.filter(
      (s1, pos, arr) =>
        arr.findIndex(s2 => s2.discipline_id === s1.discipline_id) === pos,
    );

    return uniqList;
  }
}

export default ListCourseDisciplineService;
