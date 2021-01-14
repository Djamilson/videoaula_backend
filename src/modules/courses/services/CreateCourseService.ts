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
    const courseExists = await this.coursesRepository.findByName(name);

    if (courseExists) {
      console.log('Curso já cadastrado');
      throw new AppError('There is already one course with this name');
    }

    if (image !== '') {
      console.log('Vou salvar a Imagem !', image);
      await this.storageProvider.saveFile(image);
    }

    console.log('Vou criar o curso!', name, image, price, stock);
    const course = this.coursesRepository.create({
      name,
      image,
      price,
      stock,
    });

    return course;
  }
}

export default CreateCourseService;
