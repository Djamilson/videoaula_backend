import { getRepository, Repository } from 'typeorm';

import ICreateThemeDTO from '@modules/disciplines/dtos/ICreateThemeDTO';
import IThemesRepository from '@modules/disciplines/repositories/IThemesRepository';

import Theme from '../entities/Theme';

class ThemesRepository implements IThemesRepository {
  private ormRepository: Repository<Theme>;

  constructor() {
    this.ormRepository = getRepository(Theme);
  }

  public async findById(id: string): Promise<Theme | undefined> {
    const theme = await this.ormRepository.findOne(id);

    return theme;
  }

  public async findAllThemesForDisciplineId(
    discipline_id: string,
  ): Promise<Theme[] | undefined> {
    const themes = await this.ormRepository.find({
      where: { discipline_id },
      order: { created_at: 'DESC' },
    });

    return themes;
  }

  public async findAllThemesCourseDisciplineId(
    course_discipline_id: string,
  ): Promise<Theme[] | undefined> {
    const themes = await this.ormRepository.find({
      where: { course_discipline_id },
      order: { created_at: 'DESC' },
      relations: ['movie'],
    });

    return themes;
  }

  public async findAllThemes(): Promise<Theme[] | undefined> {
    const themes = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return themes;
  }

  public async findByTitle(theme: string): Promise<Theme | undefined> {
    console.log(' fazendo a busca theme:', theme);
    const newTheme = await this.ormRepository.findOne({ where: { theme } });
    console.log('Retorno theme fazendo a busca:', newTheme);

    return newTheme;
  }

  public async create(theme: ICreateThemeDTO): Promise<Theme> {
    const newTheme = this.ormRepository.create(theme);

    await this.ormRepository.save(newTheme);

    return newTheme;
  }

  public async save(theme: Theme): Promise<Theme> {
    return this.ormRepository.save(theme);
  }
}

export default ThemesRepository;
