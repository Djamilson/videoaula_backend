import { getRepository, Repository } from 'typeorm';

import ICreateDisciplineDTO from '@modules/disciplines/dtos/ICreateDisciplineDTO';
import IDisciplinesRepository from '@modules/disciplines/repositories/IDisciplinesRepository';

import Discipline from '../entities/Discipline';

class DisciplinesRepository implements IDisciplinesRepository {
  private ormRepository: Repository<Discipline>;
  constructor() {
    this.ormRepository = getRepository(Discipline);
  }

  public async findById(id: string): Promise<Discipline | undefined> {
    const discipline = await this.ormRepository.findOne(id);

    return discipline;
  }

  public async findAllDiscipline(): Promise<Discipline[] | undefined> {
  
    const disciplines = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return disciplines;
  }


  public async findByName(name: string): Promise<Discipline | undefined> {
    const discipline = await this.ormRepository.findOne({ name });

    return discipline;
  }

  public async create(discipline: ICreateDisciplineDTO): Promise<Discipline> {
    const newDiscipline = this.ormRepository.create(discipline);

    await this.ormRepository.save(newDiscipline);

    return newDiscipline;
  }

  public async save(discipline: Discipline): Promise<Discipline> {
    return this.ormRepository.save(discipline);
  }
}

export default DisciplinesRepository;
