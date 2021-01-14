import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';
import IMoviesRepository from '../repositories/IMoviesRepository';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IThemesRepository from '../repositories/IThemesRepository';

interface IRequest {
  title: string;
  course_id: string;
  discipline_id: string;
  theme_id: string;
  filename: string;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,

    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    course_id,
    discipline_id,
    theme_id,
    filename,
  }: IRequest): Promise<CourseDiscipline> {
    const checkMovieExists = await this.moviesRepository.findByTitle(title);

    if (checkMovieExists) {
      throw new AppError('Movie already used.');
    }

    const existsTheme = await this.themesRepository.findById(theme_id);

    if (!existsTheme) {
      throw new AppError('Theme not exists');
    }

    await this.storageProvider.saveFile(filename);

    const { id } = await this.moviesRepository.create({
      title,
      movie: filename,
    });

    const movie = await this.coursesDisciplinesRepository.create({
      course_id,
      discipline_id,
    });

    return movie;
  }
}

export default CreateMovieService;
