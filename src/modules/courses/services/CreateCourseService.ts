import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  name: string;
  price: number;
  image: string;
  stock: number;
}

@injectable()
class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    price,
    image,
    stock,
  }: IRequest): Promise<Course> {
    console.log('Passou 2', name, price, image, stock);

    const courseExists = await this.coursesRepository.findByName(name);
    console.log('Passou 3', name, price, image, stock);

    if (courseExists) {
      throw new AppError('There is already one course with this name');
    }

    if (image !== '') {
      await this.storageProvider.saveFile(image);
    }
    console.log('Passou 4');

    const course = this.coursesRepository.create({
      name,
      image,
      price,
      stock,
    });
    console.log('Passou 5');

    return course;
  }
}

export default CreateCourseService;
