import { getRepository, Repository } from 'typeorm';

import IStatesRepository from '@modules/users/repositories/IStatesRepository';

import State from '../entities/State';

class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async findAll(): Promise<State[] | undefined> {
    const findAllStates = await this.ormRepository.find();

    return findAllStates;
  }
}

export default StatesRepository;
