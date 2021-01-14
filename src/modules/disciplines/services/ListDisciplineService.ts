import { injectable, inject } from 'tsyringe';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';

interface IRequest {
  course_id: string;
}

interface IDiscipline {
  id: string;
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
      return { id: p.discipline.id, name: p.discipline.name };
    });

    const uniqList = newList?.filter(
      (s1, pos, arr) => arr.findIndex(s2 => s2.id === s1.id) === pos,
    );

    return uniqList;
  }
}

export default ListCourseDisciplineService;
