import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import { cities, person, user } from '../date';
import usersGroups from '../date/usersGroups';

export default class AddPersonIdAddresses1609959220570
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'addresses',
      new TableColumn({
        name: 'person_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        name: 'AddressesPersons',
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('persons')
      .values(person)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(user)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users_groups')
      .values(usersGroups)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cities')
      .values(cities)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('addresses', 'AddressesPersons');

    await queryRunner.dropColumn('addresses', 'person_id');
  }
}
