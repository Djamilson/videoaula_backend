import { getRepository, Repository, In, Like } from 'typeorm';

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import IPaginationsDTO from '@modules/courses/dtos/IPaginationsDTO';
import IUpdateCoursesQuantityDTO from '@modules/courses/dtos/IUpdateStocksQuantityDTO';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

import Course from '../entities/Course';

interface ICourse {
  id: string;
}
class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findAllById(courses: ICourse[]): Promise<Course[]> {
    const courseIds = courses.map(item => item.id);

    const existsCourses = await this.ormRepository.find({
      where: {
        id: In(courseIds),
      },
    });

    return existsCourses;
  }

  public async findAllBy(): Promise<Course[]> {
    const existsCourses = await this.ormRepository.find();

    return existsCourses;
  }

  public async findAll(paginationDTO: IPaginationsDTO): Promise<Course[]> {
    // /para a busca
    const keyword = '';

    const courses = await this.ormRepository.find({
      where: { name: Like(`%${keyword}%`) },
      order: { name: 'DESC' },
      ...paginationDTO,
    });

    return courses;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);
    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { name },
    });

    return course;
  }

  public async create(courseData: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create(courseData);
    await this.ormRepository.save(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }

  async updateQuantity(
    courses: IUpdateCoursesQuantityDTO[],
  ): Promise<Course[]> {
    return this.ormRepository.save(courses);
  }
}

export default CoursesRepository;
