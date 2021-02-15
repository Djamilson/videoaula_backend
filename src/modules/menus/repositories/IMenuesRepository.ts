import ICreateMenuDTO from '../dtos/ICreateMenuDTO';
import Menu from '../infra/typeorm/entities/Menu';

interface IMenu {
  id: string;
}

export default interface IMenusRepository {
  findById(id: string): Promise<Menu | undefined>;
  findAllBy(): Promise<Menu[] | undefined>;
  findByLabel(label: string): Promise<Menu | undefined>;

  create(data: ICreateMenuDTO): Promise<Menu>;
  save(menu: Menu): Promise<Menu>;
}
