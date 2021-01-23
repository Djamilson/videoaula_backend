import { inject, injectable } from 'tsyringe';

import Phone from '../infra/typeorm/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';

interface IRequest {
  person_id: string;
}

@injectable()
class ListPhonesService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  public async execute({ person_id }: IRequest): Promise<Phone[] | undefined> {
    const phones = await this.phonesRepository.findAllPhonesToPersonId(
      person_id,
    );

    return phones;
  }
}

export default ListPhonesService;
