import { getRepository, Raw, Repository } from 'typeorm';

import IStateDTO from '@modules/users/dtos/IStateDTO';
import ITotalStateDTO from '@modules/users/dtos/ITotalStateDTO';
import IStatesRepository from '@modules/users/repositories/IStatesRepository';

import State from '../entities/State';

class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async findAndCount(object: IStateDTO): Promise<ITotalStateDTO> {
    const { page, pageSize, query } = object;

    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { name: 'ASC' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async findAll(): Promise<State[] | undefined> {
    const findAllStates = await this.ormRepository.find();

    return findAllStates;
  }
}

export default StatesRepository;
