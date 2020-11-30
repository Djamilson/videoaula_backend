import { inject, injectable } from 'tsyringe';

import IStatesRepository from '../repositories/IStatesRepository';

interface IState {
  value: string;
  label: string;
}

@injectable()
class ListStatesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute(): Promise<IState[] | undefined> {
    const listStates = await this.statesRepository.findAll();

    console.log('States:::', listStates);

    const options = listStates?.map(state => ({
      value: state.id,
      label: state.name,
    }));

    return options;
  }
}

export default ListStatesService;
