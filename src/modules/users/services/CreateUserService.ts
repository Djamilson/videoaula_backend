import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  groups: Array<{
    id: string;
  }>;
}

interface IGroupRequest {
  id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    groups,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already used.');
    }

    const existentGroups = await this.groupsRepository.findAllById(groups);

    if (!existentGroups.length) {
      throw new AppError('Could not find group with the ids');
    }

    const groupExistsIds = existentGroups.map(group => {
      return { group };
    });

    const hashedPassword = await this.hashProvider.generateHash(password);

    const personSerealizable = {
      name,
      status: true,
      email,
    };

    const user = this.usersRepository.create({
      person: personSerealizable,
      password: hashedPassword,
      user_groups: groupExistsIds,
    });

    return user;
  }
}

export default CreateUserService;
