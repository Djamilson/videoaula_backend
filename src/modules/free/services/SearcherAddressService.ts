import Correios from 'node-correios';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  zip_code: string;
}

interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@injectable()
class SearcherAddressService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ zipcode }: IRequest): Promise<IAddress | undefined> {
    const correios = new Correios();

    const data = await correios.consultaCEP({ cep: '77018452' });
    console.log('data:', data);

    return data;
  }
}

export default SearcherAddressService;
