import { format } from 'date-fns';
import pagarme from 'pagarme';
import { injectable } from 'tsyringe';

import Address from '@modules/users/infra/typeorm/entities/Address';

interface ICourse {
  name: string;
  subtotal: number;
  course_id: string;
  quantity: number;
  price: number;
}
interface IRequest {
  user_id: string;
  fee: number;
  card_hash: string;
  installments: string;
  total: number;

  userExists: {
    id: string;
    person: {
      name: string;
      email: string;
      cpf: string;
      rg: string;
      birdth_date: Date;
    };
  };
  newPhone: string;
  address?: Address;

  serializadCourses: ICourse[];
}

interface IPagarme {
  transaction_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: string;
  tid: string;
}

@injectable()
class CreatePagarmeCardService {
  constructor() {}

  public async execute({
    fee,
    card_hash,
    userExists,
    newPhone,
    address,
    serializadCourses,
    total,
  }: IRequest): Promise<IPagarme> {
    let client = null;

    try {
      client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });
    } catch (e) {
      console.log('Erro client:', e.response);
    }

    let pagarmeTransaction = null;
    console.log('process.env.PAGARME_API_KEY', process.env.PAGARME_API_KEY);
    console.log('serializadCourses:', serializadCourses);

    console.log(
      'data:::',
      process.env.PAGARME_API_KEY,
      parseInt(String(total * 100), 10),
      card_hash,
    );

    console.log(
      '====> 2 customer',

      userExists.id,
      userExists.person.name,
      userExists.person.email,
    );

    console.log(
      '==>> 3 documents',
      userExists.person.cpf,
      userExists.person.rg,

      [`+55${newPhone}`],
      format(userExists.person.birdth_date, 'yyyy-MM-dd'),
    );

    try {
      pagarmeTransaction = await client.transactions.create({
        api_key: process.env.PAGARME_API_KEY,
        capture: false,
        amount: parseInt(String(total * 100), 10),
        card_hash,
        customer: {
          external_id: userExists.id,
          name: userExists.person.name,
          email: userExists.person.email,
          type: 'individual',
          country: 'br',
          documents: [
            {
              type: 'cpf',
              number: userExists.person.cpf,
            },
            {
              type: 'rg',
              number: userExists.person.rg,
            },
          ],
          phone_numbers: [`+55${newPhone}`],
          birthday: format(userExists.person.birdth_date, 'yyyy-MM-dd'),
        },

        billing: {
          name: userExists.person.name,
          address: {
            country: 'br',
            state: String(address?.city.state.name),
            city: String(address?.city.name),
            neighborhood: address?.neighborhood,
            street: String(address?.street),
            complementary: String(address?.complement),
            street_number: `${address?.number}`.replace(/([^0-9])/g, ''),
            zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
          },
        },
        shipping: {
          name: userExists.person.name,
          fee,
          expedited: true,
          address: {
            country: 'br',
            state: String(address?.city.state.name),
            city: String(address?.city.name),
            neighborhood: address?.neighborhood,
            street: String(address?.street),
            complementary: String(address?.complement),
            street_number: `${address?.number}`.replace(/([^0-9])/g, ''),
            zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
          },
        },
        items: serializadCourses.map((item_course: any) => ({
          id: String(item_course.course_id),
          title: item_course.name,
          unit_price: parseInt(String(item_course.price * 100), 10),
          quantity: item_course.quantity,
          tangible: true,
        })),
      });
    } catch (error) {
      console.log('A client pool error occurred:', error);
      return error;
    }

    console.log('Finalizou a transaction', pagarmeTransaction);

    const {
      id: transaction_id,
      status,
      authorization_code,
      card_brand: brand,
      authorized_amount,
      tid,
    } = pagarmeTransaction;

    return {
      transaction_id: String(transaction_id),
      status,
      authorization_code,
      brand,
      authorized_amount: String(authorized_amount),
      tid,
    };
  }
}

export default CreatePagarmeCardService;
