import { injectable, inject } from 'tsyringe';

import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IDiscipline {
  id: string;
  name: string;
}

@injectable()
class ListDisciplinesAllService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute(): Promise<IDiscipline[] | undefined> {
    const disciplines = await this.disciplinesRepository.findAllDiscipline();

    return disciplines;
  }
}

export default ListDisciplinesAllService;
