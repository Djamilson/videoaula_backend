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
    console.log(
      'fee,card_hash, userExists, newPhone,  address,    serializadCourses, total',
      fee,
      card_hash,
      userExists,
      newPhone,
      address,
      serializadCourses,
      total,
    );
    console.log('process.env.PAGARME_API_KEY:', process.env.PAGARME_API_KEY);

    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });
    console.log('client:', client);

    const pagarmeTransaction = await client.transactions.create({
      api_key: process.env.PAGARME_API_KEY,
      capture: false,
      amount: parseInt(String(total * 100), 10),
      card_hash,
      customer: {
        external_id: '#123456789',
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
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

    console.log('pagarmeTransaction:', pagarmeTransaction);

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
