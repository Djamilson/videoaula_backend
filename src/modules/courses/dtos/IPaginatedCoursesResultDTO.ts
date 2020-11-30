import Course from '../infra/typeorm/entities/Course';

export default interface IPaginatedCoursesResultDTO {
  data: Course[];
  page: number;
  limit: number;
  totalCount: number;
}
