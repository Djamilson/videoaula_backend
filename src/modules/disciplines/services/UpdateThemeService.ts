import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Theme from '../infra/typeorm/entities/Theme';
import IThemesRepository from '../repositories/IThemesRepository';

interface IRequest {
  id: string;
  theme: string;
}

@injectable()
class UpdateThemeService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute({ id, theme }: IRequest): Promise<Theme> {
    const existsTheme = await this.themesRepository.findById(id);

    if (!existsTheme) {
      throw new AppError('Not exists theme', 401);
    }

    existsTheme.theme = theme;

    await this.themesRepository.save(existsTheme);

    return existsTheme;
  }
}

export default UpdateThemeService;
