import ICreateCourseDisciplineDTO from '../dtos/ICreateCourseDisciplineDTO';
import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';

export default interface ICoursesDisciplinesRepository {
  findById(id: string): Promise<CourseDiscipline | undefined>;
  findAllToCourseId(course_id: string): Promise<CourseDiscipline[] | undefined>;

  findByCourseDiscipline(
    course_id: string,
    discipline_id: string,
  ): Promise<CourseDiscipline | undefined>;

  findSelectDiscipline(
    course_id: string,
  ): Promise<CourseDiscipline[] | undefined>;

  findTableDiscipline(
    course_id: string,
  ): Promise<CourseDiscipline[] | undefined>;

  create(data: ICreateCourseDisciplineDTO): Promise<CourseDiscipline>;
  save(courseDiscipline: CourseDiscipline): Promise<CourseDiscipline>;
}
