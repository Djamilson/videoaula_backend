import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Menu from '../infra/typeorm/entities/Menu';
import IMenusRepository from '../repositories/IMenuesRepository';

interface IRequest {
  label: string;
  path: string;
}

@injectable()
class CreateMenuService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
  ) {}

  public async execute({ label, path }: IRequest): Promise<Menu> {
    const menuExists = await this.menusRepository.findByLabel(label);

    if (menuExists) {
      throw new AppError('There is already one menu with this name');
    }

    const menu = this.menusRepository.create({
      label,
      path,
    });
    return menu;
  }
}

export default CreateMenuService;
