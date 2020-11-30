import { inject, injectable, container } from 'tsyringe';

import ITransactionsRepository from '@modules/payments/repositories/ITransactionsRepository';
import CreatePagarmeCardService from '@modules/payments/services/CreatePagarmeCardService';
import Course from '@modules/courses/infra/typeorm/entities/Course';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IOrderCourse {
  id: string;
  quantity: number;
}

interface ICourse {
  itemCourse: {
    stock: number;
    course: {
      id: string;
      name: string;
      stock: number;
      price: number;
    };
  };
}
interface IRequest {
  user_id: string;
  fee: number;
  courses: ICourse[];
  card_hash: string;
  installments: string;
}

interface IOrderCourse {
  id: string;
  course_id: string;
  order_id: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

interface IOrder {
  user: {
    id: string;
    person: {
      id: string;
      name: string;
      email: string;
      status: boolean;
      privacy: boolean;
      avatar: string;
      address_id_man: string;
      phone_id_man: string;
    };
  };
  order_courses: IOrderCourse[];
  fee: number;
  total: number;
  id: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    user_id,
    fee,
    courses,
    card_hash,
    installments,
  }: IRequest): Promise<IOrder> {
    const createPagarmeCard = container.resolve(CreatePagarmeCardService);

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('There not find any user with the givan id');
    }

    const existentCourses = await this.coursesRepository.findAllById(courses);

    if (!existentCourses.length) {
      throw new AppError('Could not find course with the ids');
    }

    const courseExistsIds = existentCourses.map(course => course.id);

    const checkInexistentCourses = courses.filter(
      course => !courseExistsIds.includes(course.itemCourse.course.id),
    );

    if (checkInexistentCourses.length) {
      throw new AppError(
        `Could not find course ${checkInexistentCourses[0].itemCourse.course.id}`,
      );
    }

    const findCoursesWithNoQuantity = courses.filter(item => {
      return (
        existentCourses.filter(p => p.id === item.itemCourse.course.id)[0]
          .stock < item.itemCourse.stock
      );
    });
    console.log('Estou no service 2=>>>');
    if (findCoursesWithNoQuantity.length) {
      throw new AppError(
        `The quantity ${findCoursesWithNoQuantity[0].itemCourse.course.stock}
        is not available for
        ${findCoursesWithNoQuantity[0].itemCourse.course.id} `,
      );
    }

    console.log('Estou no service 3=>>>List courses', courses);

    const serializadCourses = courses.map(order_course => {
      const oldPrice = existentCourses.filter(
        p => p.id === order_course.itemCourse.course.id,
      )[0].price;

      console.log('oldPrice=>>> ', oldPrice);

      return {
        name: order_course.itemCourse.course.name,
        subtotal: oldPrice * order_course.itemCourse.stock,
        course_id: order_course.itemCourse.course.id,
        quantity: order_course.itemCourse.stock,
        price: oldPrice,
      };
    });
    console.log('SerializadCourses =>>>', serializadCourses);

    const total = serializadCourses.reduce((totalsum, item) => {
      return totalsum + item.price * item.quantity;
    }, 0);

    const phone = await this.phonesRepository.findById(
      userExists.person.phone_id_man,
    );

    const newPhone = `${phone?.prefix}${phone?.number}`.replace(
      /([^0-9])/g,
      '',
    );

    const address = await this.addressesRepository.findById(
      userExists.person.address_id_man,
    );

    const {
      transaction_id,
      status,
      authorization_code,
      authorized_amount,
      brand,
      tid,
    } = await createPagarmeCard.execute({
      fee,
      card_hash,
      userExists,
      newPhone,
      address,
      serializadCourses,
      user_id,
      installments,
      total: total + fee,
    });

    console.log('Estou no service pagamento =>>>');
    const newOrder = await this.ordersRepository.create({
      user: userExists,
      courses: serializadCourses,
      total: total + fee,
      fee,
    });

    console.log('Estou no service pagamento =>>> Find');
    const { id: order_id, order_courses } = newOrder;

    const orderedCoursesQuantity = order_courses.map(course => ({
      id: course.course_id,
      stock:
        existentCourses.filter(p => p.id === course.course_id)[0].stock -
        course.quantity,
    }));

    await this.coursesRepository.updateQuantity(orderedCoursesQuantity);

    const order_courseIds = order_courses.map((ord_course: IOrderCourse) => {
      return {
        itemCourse: {
          stock: 0,
          course: {
            id: ord_course.course_id,
            name: '',
            price: 0,
          },
        },
      };
    });

    const myCourses = await this.coursesRepository.findAllById(order_courseIds);

    const courses_to_names = order_courses.map(ordersCourses => {
      return {
        ...ordersCourses,
        name: myCourses.filter((prod: Course) => {
          if (prod.id === ordersCourses.course_id) {
            return prod.name;
          }
        })[0].name,
      };
    });

    await this.transactionsRepository.create({
      transaction_id,
      status,
      authorization_code,
      authorized_amount,
      brand,
      tid,
      installments,
      order_id,
    });

    const order = {
      user: {
        id: newOrder.user.id,
        person: {
          id: newOrder.user.person.id,
          name: newOrder.user.person.name,
          email: newOrder.user.person.email,
          status: newOrder.user.person.status,
          privacy: newOrder.user.person.privacy,
          avatar: newOrder.user.person.avatar,
          address_id_man: newOrder.user.person.address_id_man,
          phone_id_man: newOrder.user.person.phone_id_man,
        },
      },
      order_courses: [...courses_to_names],
      id: newOrder.id,
      fee: newOrder.fee,
      total: newOrder.total,
      created_at: newOrder.created_at,
      updated_at: newOrder.updated_at,
    };

    return order;
  }
}

export default CreateOrderService;
