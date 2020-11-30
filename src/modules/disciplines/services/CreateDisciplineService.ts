import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Discipline from '../infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateDisciplineService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Discipline> {
    const checkDisciplineExists = await this.disciplinesRepository.findByName(
      name,
    );

    if (checkDisciplineExists) {
      throw new AppError('Discipline already used.');
    }

    const discipline = this.disciplinesRepository.create({
      name,
    });

    return discipline;
  }
}

export default CreateDisciplineService;
