import { getRepository, Repository } from 'typeorm';

import IUpdatePersonDTO from '@modules/users/dtos/IUpdatePersonDTO';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';

import Person from '../entities/Person';

class PersonsRepository implements IPersonsRepository {
  private ormPersonRepository: Repository<Person>;

  constructor() {
    this.ormPersonRepository = getRepository(Person);
  }

  public async findById(id: string): Promise<Person | undefined> {
    const person = await this.ormPersonRepository.findOne(id, {
      relations: ['phone', 'address'],
    });

    return person;
  }

  public async create(person: IUpdatePersonDTO): Promise<Person> {
    const newPerson = this.ormPersonRepository.create(person);

    await this.ormPersonRepository.save(newPerson);

    return newPerson;
  }

  public async save(person: Person): Promise<Person> {
    console.log('Agora quero vê', person);

    return this.ormPersonRepository.save(person);
  }
}

export default PersonsRepository;
