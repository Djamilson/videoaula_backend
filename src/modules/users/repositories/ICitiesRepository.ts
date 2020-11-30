import City from '../infra/typeorm/entities/City';

export default interface IAddressesRepository {
  findByCitiesToStateId(state_id: string): Promise<City[] | undefined>;
}
