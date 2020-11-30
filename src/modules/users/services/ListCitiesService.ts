import { inject, injectable } from 'tsyringe';

import ICitiesRepository from '../repositories/ICitiesRepository';

interface ICity {
  value: string;
  label: string;
}

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(state_id: string): Promise<ICity[] | undefined> {
    const listCities = await this.citiesRepository.findByCitiesToStateId(
      state_id,
    );

    const options = listCities?.map(city => ({
      value: city.id,
      label: city.name,
    }));

    return options;
  }
}

export default ListCitiesService;
