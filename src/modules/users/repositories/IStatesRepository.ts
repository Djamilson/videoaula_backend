import State from '../infra/typeorm/entities/State';

export default interface IStatesRepository {
  findAll(): Promise<State[] | undefined>;
}
