import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CommentsAnswersRepository from '@modules/disciplines/infra/typeorm/repositories/CommentsAnswersRepository';
import CommentsRepository from '@modules/disciplines/infra/typeorm/repositories/CommentsRepository';
import CoursesDisciplinesRepository from '@modules/disciplines/infra/typeorm/repositories/CoursesDisciplinesRepository';
import DisciplinesRepository from '@modules/disciplines/infra/typeorm/repositories/DisciplinesRepository';
import MoviesRepository from '@modules/disciplines/infra/typeorm/repositories/MoviesRepository';
import ThemesRepository from '@modules/disciplines/infra/typeorm/repositories/ThemesRepository';
import ICommentsAnswersRepository from '@modules/disciplines/repositories/ICommentsAnswersRepository';
import ICommentsRepository from '@modules/disciplines/repositories/ICommentsRepository';
import ICoursesDisciplinesRepository from '@modules/disciplines/repositories/ICoursesDisciplinesRepository';
import IDisciplinesRepository from '@modules/disciplines/repositories/IDisciplinesRepository';
import IMoviesRepository from '@modules/disciplines/repositories/IMoviesRepository';
import IThemesRepository from '@modules/disciplines/repositories/IThemesRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import TransactionsRepository from '@modules/payments/infra/typeorm/repositories/TransactionsRepository';
import ITransactionsRepository from '@modules/payments/repositories/ITransactionsRepository';
import AddressesRepository from '@modules/users/infra/typeorm/repositories/AddressesRepository';
import CitiesRepository from '@modules/users/infra/typeorm/repositories/CitiesRepository';
import GroupsRepository from '@modules/users/infra/typeorm/repositories/GroupsRepository';
import PersonsRepository from '@modules/users/infra/typeorm/repositories/PersonsRepository';
import PhonesRepository from '@modules/users/infra/typeorm/repositories/PhonesRepository';
import StatesRepository from '@modules/users/infra/typeorm/repositories/StatesRepository';
import UsersGroupsRepository from '@modules/users/infra/typeorm/repositories/UsersGroupsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import ICitiesRepository from '@modules/users/repositories/ICitiesRepository';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import IStatesRepository from '@modules/users/repositories/IStatesRepository';
import IUsersGroupsRepository from '@modules/users/repositories/IUsersGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository,
);
container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);

container.registerSingleton<ICoursesDisciplinesRepository>(
  'CoursesDisciplinesRepository',
  CoursesDisciplinesRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<ICommentsAnswersRepository>(
  'CommentsAnswersRepository',
  CommentsAnswersRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IDisciplinesRepository>(
  'DisciplinesRepository',
  DisciplinesRepository,
);

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<IThemesRepository>(
  'ThemesRepository',
  ThemesRepository,
);
