import { inject, injectable } from 'tsyringe';

import Discipline from '../infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindDisciplineService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Discipline | undefined> {
    const discipline = await this.disciplinesRepository.findById(id);

    return discipline;
  }
}

export default FindDisciplineService;
