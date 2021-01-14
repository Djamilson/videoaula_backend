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
  authorization_code: number;
  brand: string;
  authorized_amount: number;
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
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const pagarmeTransaction = await client.transactions.create({
      api_key: process.env.PAGARME_API_KEY,
      capture: 'false',
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
          state: address?.city.state.name,
          city: address?.city.name,
          neighborhood: address?.neighborhood,
          street: address?.street,
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
          state: address?.city.state.name,
          city: address?.city.name,
          neighborhood: address?.neighborhood,
          street: address?.street,
          street_number: `${address?.number}`.replace(/([^0-9])/g, ''),
          zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
        },
      },
      items: serializadCourses.map((item: any) => ({
        id: String(item.course_id),
        title: item.name,
        unit_price: parseInt(String(item.price * 100), 10),
        quantity: item.quantity,
        tangible: true,
      })),
    });

    const {
      id: transaction_id,
      status,
      authorization_code,
      card_brand: brand,
      authorized_amount,
      tid,
    } = pagarmeTransaction;

    return {
      transaction_id,
      status,
      authorization_code,
      brand,
      authorized_amount,
      tid,
    };
  }
}

export default CreatePagarmeCardService;
