import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import Phone from '../infra/typeorm/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  number: string;
  prefix: string;
  user_id: string;
}

@injectable()
class CreatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ number, prefix, user_id }: IRequest): Promise<Phone> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('Email address already used.');
    }
    const { person_id } = checkUserExists;

    const checkPhoneExists = await this.phonesRepository.findByPhone({
      number,
      prefix,
      person_id,
    });

    if (checkPhoneExists) {
      throw new AppError('Phone already used.');
    }

    const phoneSerealizable = {
      number,
      prefix,
      person_id,
    };

    const phone = this.phonesRepository.create(phoneSerealizable);

    return phone;
  }
}

export default CreatePhoneService;
