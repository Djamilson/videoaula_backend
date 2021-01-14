import { parse } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Person from '../infra/typeorm/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cpf: string;
  birdthDate: string;
  rg: string;
  rgss: string;
  address_id: string;
  phone_id_man: string;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    birdthDate,
    rg,
    rgss,
    address_id,
    phone_id_man,
  }: IRequest): Promise<Person> {
    const newBirdthDate = parse(birdthDate, 'dd/MM/yyyy', new Date());

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.person.cpf = cpf;
    user.person.rg = rg;
    user.person.rgss = rgss;
    user.person.birdth_date = newBirdthDate;
    user.person.address_id_man = address_id;
    user.person.phone_id_man = phone_id_man;

    return this.personsRepository.save(user.person);
  }
}

export default UpdatePersonService;
