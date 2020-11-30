import ICreateDisciplineDTO from '../dtos/ICreateDisciplineDTO';
import Discipline from '../infra/typeorm/entities/Discipline';

export default interface IDisciplinesRepository {
  findById(id: string): Promise<Discipline | undefined>;
  findByName(name: string): Promise<Discipline | undefined>;
  create(data: ICreateDisciplineDTO): Promise<Discipline>;
  save(discipline: Discipline): Promise<Discipline>;

  findAllDiscipline(): Promise<Discipline[] | undefined>;
}
