import { getRepository, Raw, Repository } from 'typeorm';

import ICityDTO from '@modules/users/dtos/ICityDTO';
import ITotalCityDTO from '@modules/users/dtos/ITotalCityDTO';
import ICitiesRepository from '@modules/users/repositories/ICitiesRepository';

import City from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findByCitiesToStateId(
    object: ICityDTO,
  ): Promise<City[] | undefined> {
    const { state_id, page, pageSize, query } = object;
    const listCities = await this.ormRepository.find({
      where: {
        state_id,
        name: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { name: 'DESC' },
      take: (page - 1) * pageSize,
      skip: page,
    });

    return listCities;
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne(id, {
      relations: ['state'],
    });

    return city;
  }

  public async findAndCount(object: ICityDTO): Promise<ITotalCityDTO> {
    const { state_id, page, pageSize, query } = object;

    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        state_id,
        name: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { name: 'DESC' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }
}

export default CitiesRepository;
