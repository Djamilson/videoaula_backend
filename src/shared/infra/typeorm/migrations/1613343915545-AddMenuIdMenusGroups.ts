import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddMenuIdMenusGroups1613343915545
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menus_groups',
      new TableColumn({
        name: 'menu_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'menus_groups',
      new TableForeignKey({
        name: 'MenusGroupsMenu',
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menus',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('menus_groups', 'MenusGroupsMenu');

    await queryRunner.dropColumn('menus_groups', 'menu_id');
  }
}
