import { format } from 'date-fns';
import JSONFormatter from 'json-formatter-js';
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
  order_id: string;
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
  json_result: JSONFormatter;
}

@injectable()
class CreatePagarmeBoletoService {
  constructor() {}

  public async execute({
    fee,
    order_id,
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
        card_holder_name: userExists.person.name,
        amount: parseInt(String(total * 100), 10),
        // Passando a URL que vai receber o resultado
        postback_url: 'http://7d3e69e650e5.ngrok.io/postback_url',
        metadata: {
          idOrder: order_id,
        },
        // Vamos executar a chamada assíncrona
        async: false,
        capture: true,
        payment_method: 'boleto',
        boleto_instructions:
          'Use esse atributo para preencher o Campo instruções do boleto.',

        customer,
        installments: 1,
      });
    } catch (err) {
      console.log('Err', err);
      console.log('Err', err.response.errors);

      throw new AppError('Erro pagarme');
    }
    console.log('Boleto retorno :', pagarmeTransaction);
    const { id: transaction_id, status } = pagarmeTransaction;

    return {
      transaction_id: String(transaction_id),
      status,
      json_result: pagarmeTransaction,
    };
  }
}

export default CreatePagarmeBoletoService;
