import { parseISO, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Person from '../infra/typeorm/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cpf: string;
  rg: string;
  rgss: string;
  birdthDate: string;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    birdthDate,
    rg,
    rgss,
  }: IRequest): Promise<Person> {
    console.log('service?:::', cpf, birdthDate, rg, rgss);

    const hourStart = parseISO(birdthDate);
    const c = format(hourStart, 'yyyy-MM-dd');
    console.log('Minha data de nascimento: ', c);

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    /* const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }
*/
    /* if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

     // user.password = await this.hashProvider.generateHash(password);
    } */
    return this.personsRepository.save(user.person);
  }
}

export default UpdatePersonService;
