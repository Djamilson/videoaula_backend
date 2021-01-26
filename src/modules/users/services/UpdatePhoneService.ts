import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Phone from '../infra/typeorm/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';

interface IRequest {
  person_id: string;
  id: string;
  number: string;
}

@injectable()
class UpdatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  public async execute({ id, number, person_id }: IRequest): Promise<Phone> {
    const checkPhoneExists = await this.phonesRepository.findByPhone({
      number,
      person_id,
    });

    if (checkPhoneExists) {
      throw new AppError('Phone already used.');
    }

    const phone = await this.phonesRepository.findById(id);

    if (!phone) {
      throw new AppError('Phone not found');
    }

    phone.number = number;

    return this.phonesRepository.save(phone);
  }
}

export default UpdatePhoneService;
