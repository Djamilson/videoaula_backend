import { inject, injectable } from 'tsyringe';

import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IState {
  value: string;
  label: string;
}

@injectable()
class AllDisciplinesService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute(): Promise<IState[] | undefined> {
    const listDisciplines = await this.disciplinesRepository.findAllDiscipline();

    const options = listDisciplines?.map(discipline => ({
      value: discipline.id,
      label: discipline.name,
    }));

    return options;
  }
}

export default AllDisciplinesService;
