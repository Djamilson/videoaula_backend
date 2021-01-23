import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Person from '../infra/typeorm/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';

interface IRequest {
  person_id: string;
}

@injectable()
class ShowPersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ person_id }: IRequest): Promise<Person> {
    console.log('person_id:', person_id);
    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new AppError('Person not found');
    }

    return person;
  }
}

export default ShowPersonService;
