import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import IPersonsRepository from '../repositories/IPersonsRepository';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  phone: string;
  user_id: string;
}
interface IPhone {
  id: string;
  phone: string;
  person_id: string;
  main: boolean;
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

  public async execute({ phone, user_id }: IRequest): Promise<IPhone> {
    console.log('phone, user_id ', phone, user_id);
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not exists.');
    }
    console.log('phone, user_id 2', phone, user_id);
    const { person_id } = checkUserExists;

    const checkPhoneExists = await this.phonesRepository.findByPhone({
      phone,
      person_id,
    });

    console.log('checkPhoneExists: 3 ', checkPhoneExists);
    if (checkPhoneExists) {
      throw new AppError('Phone already used.');
    }

    console.log('checkPhoneExists: 4 ', checkPhoneExists);
    const { person } = checkUserExists;

    const phoneSerealizable = {
      phone,
      person_id,
    };

    const newPhone = await this.phonesRepository.create(phoneSerealizable);

    console.log('checkPhoneExists: 5 ', newPhone);
    const serealizablePhone = {
      id: newPhone.id,
      phone: newPhone.phone,
      person_id: newPhone.person_id,
      main: true,
    };

    person.phone_id_man = newPhone.id;

    await this.personsRepository.save(person);

    return serealizablePhone;
  }
}

export default CreatePhoneService;
