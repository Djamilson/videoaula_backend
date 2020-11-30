import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import IPaginationsDTO from '../dtos/IPaginationsDTO';
import IUpdateCoursesQuantityDTO from '../dtos/IUpdateStocksQuantityDTO';
import Course from '../infra/typeorm/entities/Course';

interface ICourse {
  itemCourse: {
    stock: number;
    course: {
      id: string;
      price: number;
      name: string;
    };
  };
}

export default interface ICoursesRepository {
  findById(id: string): Promise<Course | undefined>;
  findAllById(courses: ICourse[]): Promise<Course[]>;
  findAll(paginationDTO: IPaginationsDTO): Promise<Course[]>;
  findAllBy(): Promise<Course[] | undefined>;
  findByName(name: string): Promise<Course | undefined>;
  updateQuantity(courses: IUpdateCoursesQuantityDTO[]): Promise<Course[]>;

  create(data: ICreateCourseDTO): Promise<Course>;
  save(course: Course): Promise<Course>;
}
