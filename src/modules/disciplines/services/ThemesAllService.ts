import { inject, injectable } from 'tsyringe';

import IThemesRepository from '../repositories/IThemesRepository';

interface ITheme {
  id: string;
  theme: string;
}

@injectable()
class ThemesAllService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute(): Promise<ITheme[] | undefined> {
    const themes = await this.themesRepository.findAllThemes();

    return themes;
  }
}

export default ThemesAllService;
