import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAddressesRepository from '../repositories/IAddressesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IState {
  id: string;
  name: string;
}

interface ICity {
  id: string;
  name: string;
  state: IState;
}

export interface IAddress {
  id: string;
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  person_id: string;
  city: ICity;
}

@injectable()
class ListAddressesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(user_id: string): Promise<IAddress[] | undefined> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('There not find any user with the givan id');
    }

    const listAddresses = await this.addressesRepository.findAllAddressesToPerson(
      userExists.person_id,
    );

    return listAddresses;
  }
}

export default ListAddressesService;
