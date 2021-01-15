import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  stock: number;
}

@injectable()
class UpdateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ id, name, stock, price }: IRequest): Promise<Course> {
    const courseExist = await this.coursesRepository.findById(id);

    if (!courseExist) {
      throw new AppError('Course not found');
    }

    courseExist.name = name;
    courseExist.price = price;
    courseExist.stock = stock;

    return this.coursesRepository.save(courseExist);
  }
}

export default UpdateCoursesService;
