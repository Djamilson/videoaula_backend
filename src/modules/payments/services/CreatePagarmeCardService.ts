import { format } from 'date-fns';
import pagarme from 'pagarme';
import { injectable } from 'tsyringe';

import Address from '@modules/users/infra/typeorm/entities/Address';

import AppError from '@shared/errors/AppError';

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
      console.log('Err 01', e.errors);

      throw new AppError('Erro pagarme 01');
    }

    let pagarmeTransaction = null;

    const customer = {
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
    };

    const meAddress = {
      country: 'br',
      state: String(address?.city.state.name),
      city: String(address?.city.name),
      neighborhood: address?.neighborhood,
      street: String(address?.street),
      complementary: String(address?.complement),
      street_number: String(address?.number),
      zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
    };

    try {
      pagarmeTransaction = await client.transactions.create({
        api_key: process.env.PAGARME_API_KEY,
        capture: false,
        amount: parseInt(String(total * 100), 10),
        card_hash,
        customer,
        billing: {
          name: userExists.person.name,
          address: meAddress,
        },
        shipping: {
          name: userExists.person.name,
          fee,
          expedited: true,
          address: meAddress,
        },
        items: serializadCourses.map((item_course: any) => ({
          id: String(item_course.course_id),
          title: item_course.name,
          unit_price: parseInt(String(item_course.price * 100), 10),
          quantity: item_course.quantity,
          tangible: true,
        })),
      });
    } catch (err) {
      console.log('Err', err);
      console.log('Err', err.response.errors);

      throw new AppError('Erro pagarme');
    }

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
