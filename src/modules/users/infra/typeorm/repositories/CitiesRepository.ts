import { getRepository, Repository } from 'typeorm';

import ICitiesRepository from '@modules/users/repositories/ICitiesRepository';

import City from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findByCitiesToStateId(
    state_id: string,
  ): Promise<City[] | undefined> {
    const listCities = await this.ormRepository.find({
      where: { state_id },
    });

    return listCities;
  }
}

export default CitiesRepository;
