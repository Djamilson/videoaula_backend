import { getRepository, Repository } from 'typeorm';

import ICreateCourseDisciplineDTO from '@modules/disciplines/dtos/ICreateCourseDisciplineDTO';
import ICoursesDisciplinesRepository from '@modules/disciplines/repositories/ICoursesDisciplinesRepository';

import CourseDiscipline from '../entities/CourseDiscipline';

class CoursesDisciplinesRepository implements ICoursesDisciplinesRepository {
  private ormRepository: Repository<CourseDiscipline>;
  constructor() {
    this.ormRepository = getRepository(CourseDiscipline);
  }

  public async findById(id: string): Promise<CourseDiscipline | undefined> {
    const courseDiscipline = await this.ormRepository.findOne(id);

    return courseDiscipline;
  }

  public async findByCourseDiscipline(
    course_id: string,
    discipline_id: string,
  ): Promise<CourseDiscipline | undefined> {
    console.log('Estou fazendo a busca:', course_id, discipline_id);

    const courseDiscipline = await this.ormRepository.findOne({
      where: { course_id, discipline_id },
    });

    return courseDiscipline;
  }

  public async findSelectDiscipline(
    course_id: string,
  ): Promise<CourseDiscipline[] | undefined> {
    const coursesDisciplines = await this.ormRepository.find({
      where: { course_id },
      relations: ['discipline'],
    });

    return coursesDisciplines;
  }

  public async findTableDiscipline(
    course_id: string,
  ): Promise<CourseDiscipline[] | undefined> {
    const coursesDisciplines = await this.ormRepository.find({
      where: { course_id },
      relations: ['discipline'],
    });

    return coursesDisciplines;
  }

  public async findAllToCourseId(
    course_id: string,
  ): Promise<CourseDiscipline[] | undefined> {
    const courseDiscipline = await this.ormRepository.find({
      where: { course_id },
      relations: ['discipline'],
    });

    return courseDiscipline;
  }

  public async create(
    courseDiscipline: ICreateCourseDisciplineDTO,
  ): Promise<CourseDiscipline> {
    const newCourseDiscipline = this.ormRepository.create(courseDiscipline);

    await this.ormRepository.save(newCourseDiscipline);

    return newCourseDiscipline;
  }

  public async save(
    courseDiscipline: CourseDiscipline,
  ): Promise<CourseDiscipline> {
    return this.ormRepository.save(courseDiscipline);
  }
}

export default CoursesDisciplinesRepository;
