import { inject, injectable } from 'tsyringe';

import ICoursesDisciplinesRepository from '../repositories/ICoursesDisciplinesRepository';
import IThemesRepository from '../repositories/IThemesRepository';

interface IMovie {
  id: string;
  title: string;
}

interface ITheme {
  id: string;
  theme: string;
  movie: IMovie;
}

interface IRequest {
  course_id: string;
  discipline_id: string;
}

@injectable()
class ThemesAllCourseDisciplineIdService {
  constructor(
    @inject('CoursesDisciplinesRepository')
    private coursesDisciplinesRepository: ICoursesDisciplinesRepository,

    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute({
    course_id,
    discipline_id,
  }: IRequest): Promise<ITheme[] | undefined> {
    const courseDiscipline = await this.coursesDisciplinesRepository.findByCourseDiscipline(
      course_id,
      discipline_id,
    );

    console.log('==>', courseDiscipline);

    if (courseDiscipline) {
      const { id } = courseDiscipline;
      const themes = await this.themesRepository.findAllThemesCourseDisciplineId(
        id,
      );
      return themes;
    }

    return undefined;
  }
}

export default ThemesAllCourseDisciplineIdService;
