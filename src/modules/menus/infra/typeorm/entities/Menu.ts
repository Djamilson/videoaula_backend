import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import GroupsMenus from '@modules/menus/infra/typeorm/entities/GroupsMenus';

@Entity('menus')
class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  path: string;

  @OneToMany(() => GroupsMenus, group_menus => group_menus.menu)
  group_menus: GroupsMenus[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Menu;
