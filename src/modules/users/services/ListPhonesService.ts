import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Phone from '../infra/typeorm/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}
interface IPhone {
  id: string;
  number: string;
  person_id: string;
  main: boolean;
}
@injectable()
class ListPhonesService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IPhone[] | undefined> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }
    const { person_id } = checkUserExists;

    const phones = await this.phonesRepository.findAllPhonesToPersonId(
      person_id,
    );

    const serializablePhone = phones?.map((phone: Phone) => {
      const { id, number, person_id: personId } = phone;
      if (phone.id === checkUserExists.person.phone_id_man) {
        return {
          id,
          number,
          person_id: personId,
          main: true,
        };
      }
      return {
        id,
        number,
        person_id: personId,
        main: false,
      };
    });

    return serializablePhone;
  }
}

export default ListPhonesService;
