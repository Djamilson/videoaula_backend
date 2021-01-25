import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import Phone from '../infra/typeorm/entities/Phone';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  number: string;
  user_id: string;
}

@injectable()
class CreatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ number, user_id }: IRequest): Promise<Phone> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not exists.');
    }
    const { person_id } = checkUserExists;

    const checkPhoneExists = await this.phonesRepository.findByPhone({
      number,
      person_id,
    });

    if (checkPhoneExists) {
      throw new AppError('Phone already used.');
    }

    const { person } = checkUserExists;

    const phoneSerealizable = {
      number,
      person_id,
    };

    const phone = await this.phonesRepository.create(phoneSerealizable);

    person.phone_id_man = phone.id;

    await this.personsRepository.save(person);

    return phone;
  }
}

export default CreatePhoneService;
