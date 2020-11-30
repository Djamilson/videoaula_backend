import ICreateThemeDTO from '../dtos/ICreateThemeDTO';
import Theme from '../infra/typeorm/entities/Theme';

export default interface IThemesRepository {
  findById(id: string): Promise<Theme | undefined>;
  findByTitle(theme: string): Promise<Theme | undefined>;
  create(data: ICreateThemeDTO): Promise<Theme>;
  save(theme: Theme): Promise<Theme>;

  findAllThemesForDisciplineId(
    discipline_id: string,
  ): Promise<Theme[] | undefined>;

  findAllThemesCourseDisciplineId(
    course_discipline_id: string,
  ): Promise<Theme[] | undefined>;

  findAllThemes(): Promise<Theme[] | undefined>;
}
