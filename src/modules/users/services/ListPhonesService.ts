import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Phone from '../infra/typeorm/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPhonesService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Phone[] | undefined> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }
    const { person_id } = checkUserExists;

    const phones = await this.phonesRepository.findAllPhonesToPersonId(
      person_id,
    );

    return phones;
  }
}

export default ListPhonesService;
