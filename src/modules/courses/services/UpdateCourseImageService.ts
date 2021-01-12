import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  course_id: string;
  imageFilename: string;
}

@injectable()
class UpdateCourseImageService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    course_id,
    imageFilename,
  }: IRequest): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Only authenticated course can change avatar.', 401);
    }

    if (course.image) {
      await this.storageProvider.deleteFile(course.image);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    course.image = filename;

    await this.coursesRepository.save(course);

    return course;
  }
}

export default UpdateCourseImageService;
