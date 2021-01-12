import { injectable, inject, container } from 'tsyringe';

import CreateMovieService from '@modules/disciplines/services/CreateMovieService';

import AppError from '@shared/errors/AppError';

import Theme from '../infra/typeorm/entities/Theme';
import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';
import IThemesRepository from '../repositories/IThemesRepository';

interface IRequest {
  course_id: string;
  discipline_id: string;
  theme: string;
  title: string;
  movie: string;
  image: string;
}

@injectable()
class CreateThemeService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,

    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    title,
    theme,
    course_id,
    discipline_id,
    movie,
    image,
  }: IRequest): Promise<Theme> {
    const checkCourseDisciplineExists = await this.coursesDisciplinesRepository.findByCourseDiscipline(
      course_id,
      discipline_id,
    );

    if (!checkCourseDisciplineExists) {
      throw new AppError('CourseDiscipline not exist.');
    }

    const { id: course_discipline_id } = checkCourseDisciplineExists;

    const checkThemeExists = await this.themesRepository.findByTitle(theme);

    if (checkThemeExists) {
      throw new AppError('Movie already used.');
    }

    const createMovieService = container.resolve(CreateMovieService);

    const { id } = await createMovieService.execute({
      title,
      image,
      movie,
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
