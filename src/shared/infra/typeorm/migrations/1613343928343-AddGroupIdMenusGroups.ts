import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddGroupIdMenusGroups1613343928343
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menus_groups',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'menus_groups',
      new TableForeignKey({
        name: 'GroupsGroupsMenu',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('menus_groups', 'GroupsGroupsMenu');

    await queryRunner.dropColumn('menus_groups', 'group_id');
  }
}
