import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Menu from '@modules/menus/infra/typeorm/entities/Menu';
import Group from '@modules/users/infra/typeorm/entities/Group';

@Entity('groups_menus')
class GroupsMenus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, menu => menu.group_menus)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => Group, group => group.menu_groups)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  menu_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GroupsMenus;
