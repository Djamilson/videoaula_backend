import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';
import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';

import IMoviesRepository from '../repositories/IMoviesRepository';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IThemesRepository from '../repositories/IThemesRepository';
import Theme from '../infra/typeorm/entities/Theme';

interface IRequest {
  course_id: string;
  discipline_id: string;
  theme: string;
  title: string;
  filename: string;
}

@injectable()
class CreateThemeService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,

    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,

    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    title,
    theme,
    course_id,
    discipline_id,
    filename,
  }: IRequest): Promise<Theme> {
    const checkCourseDisciplineExists = await this.coursesDisciplinesRepository.findByCourseDiscipline(
      course_id,
      discipline_id,
    );

    if (!checkCourseDisciplineExists) {
      throw new AppError('CourseDiscipline not exist.');
    }
    console.log('Passou 2');
    const { id: course_discipline_id } = checkCourseDisciplineExists;

    const checkThemeExists = await this.themesRepository.findByTitle(theme);

    if (checkThemeExists) {
      throw new AppError('Movie already used.');
    }

    const { id } = await this.moviesRepository.create({
      title,
      movie: filename,
    });

    const objectTheme = await this.themesRepository.create({
      theme,
      movie_id: id,
      course_discipline_id,
    });

    return objectTheme;
  }
}

export default CreateThemeService;
