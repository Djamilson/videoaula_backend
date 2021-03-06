import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';

import MenusGroups from '@modules/menus/infra/typeorm/entities/GroupsMenus';
import UsersGroups from '@modules/users/infra/typeorm/entities/UsersGroups';

@Entity('groups')
class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UsersGroups, user_groups => user_groups.group)
  user_groups: UsersGroups[];

  @OneToMany(() => MenusGroups, menu_groups => menu_groups.group)
  menu_groups: MenusGroups[];

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Group;
