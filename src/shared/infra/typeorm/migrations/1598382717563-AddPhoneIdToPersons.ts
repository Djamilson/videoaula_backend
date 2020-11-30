import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPhoneIdToPersons1598382717563
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'persons',
      new TableColumn({
        name: 'phone_id_man',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'persons',
      new TableForeignKey({
        name: 'PersonsPhones',
        columnNames: ['phone_id_man'],
        referencedColumnNames: ['id'],
        referencedTableName: 'phones',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('persons', 'PersonsPhones');

    await queryRunner.dropColumn('persons', 'phone_id_man');
  }
}
