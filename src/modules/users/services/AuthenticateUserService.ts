import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IGroupsRepository from '../repositories/IGroupsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IGroup {
  id: string;
  name: string;
  description: string;
}
interface IUserSerializable {
  id: string;
  is_verified: boolean;
  user_groups: IGroup[];
  person: {
    id: string;
    name: string;
    email: string;
    status: boolean;
    privacy: boolean;
    avatar?: string;
    avatar_url?: () => string | null;
  };
}

interface IResponse {
  user: IUserSerializable;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userOut = await this.usersRepository.findByEmail(email);

    if (!userOut) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userOut.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const groups = userOut.user_groups.map(group => {
      return { id: group.group_id };
    });

    const listgroup = await this.groupsRepository.findAllById(groups);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userOut.id,
      expiresIn,
    });

    const user = {
      id: userOut.id,
      is_verified: userOut.is_verified,
      user_groups: [...listgroup],
      person: {
        id: userOut.person.id,
        name: userOut.person.name,
        email: userOut.person.email,
        status: userOut.person.status,
        privacy: userOut.person.privacy,
        avatar: userOut.person.avatar,
        address_id_man: userOut.person.address_id_man,
        avatar_url: userOut.person.getAvatarUrl,
      },
    };

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
