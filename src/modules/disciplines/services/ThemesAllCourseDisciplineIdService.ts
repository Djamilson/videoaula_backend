import { inject, injectable } from 'tsyringe';

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
  course_discipline_id: string;
}


@injectable()
class ThemesAllCourseDisciplineIdService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute({
    course_discipline_id,
  }: IRequest): Promise<ITheme[] | undefined> {
    const themes = await this.themesRepository.findAllThemesCourseDisciplineId(
      course_discipline_id,
    );

    return themes;
  }
}

export default ThemesAllCourseDisciplineIdService;
