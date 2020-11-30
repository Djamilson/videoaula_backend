import { inject, injectable } from 'tsyringe';

import IThemesRepository from '../repositories/IThemesRepository';

interface IRequest {
  discipline_id: string;
}

interface ITheme {
  id: string;
  theme: string;
}

@injectable()
class SearchThemeForDisciplineIdService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute({
    discipline_id,
  }: IRequest): Promise<ITheme[] | undefined> {
    const themes = await this.themesRepository.findAllThemesForDisciplineId(
      discipline_id,
    );

    return themes;
  }
}

export default SearchThemeForDisciplineIdService;
