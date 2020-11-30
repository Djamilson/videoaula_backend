import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Discipline from '../infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateDisciplineService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Discipline> {
    const disciplineExist = await this.disciplinesRepository.findById(id);

    if (!disciplineExist) {
      throw new AppError('Discipline not found');
    }

    const checkDisciplineExists = await this.disciplinesRepository.findByName(
      name,
    );

    if (checkDisciplineExists) {
      throw new AppError('Discipline already used.');
    }

    disciplineExist.name = name;

    return this.disciplinesRepository.save(disciplineExist);
  }
}

export default UpdateDisciplineService;
