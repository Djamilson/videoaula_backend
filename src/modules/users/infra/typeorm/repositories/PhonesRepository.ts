import { getRepository, Repository } from 'typeorm';

import ICreatePhoneDTO from '@modules/users/dtos/ICreatePhoneDTO';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';

import Phone from '../entities/Phone';

class PhonesRepository implements IPhonesRepository {
  private ormPhoneRepository: Repository<Phone>;

  constructor() {
    this.ormPhoneRepository = getRepository(Phone);
  }

  public async findAllPhonesToPerson(id: string): Promise<Phone[] | undefined> {
    const phone = this.ormPhoneRepository.find({
      where: { person_id: id },
      relations: ['phone'],
    });

    return phone;
  }

  public async findById(id: string): Promise<Phone | undefined> {
    console.log('id my phone:', id);

    const phone = await this.ormPhoneRepository.findOne(id);

    return phone;
  }

  public async findByPhone(data: ICreatePhoneDTO): Promise<Phone | undefined> {
    const phone = await this.ormPhoneRepository.findOne({
      where: { ...data },
    });

    return phone;
  }

  public async create(phone: ICreatePhoneDTO): Promise<Phone> {
    const newPhone = this.ormPhoneRepository.create(phone);

    await this.ormPhoneRepository.save(newPhone);

    return newPhone;
  }

  public async save(phone: Phone): Promise<Phone> {
    return this.ormPhoneRepository.save(phone);
  }

  public async createListPhone(phones: ICreatePhoneDTO[]): Promise<Phone[]> {
    return this.ormPhoneRepository.save(phones);
  }
}

export default PhonesRepository;
