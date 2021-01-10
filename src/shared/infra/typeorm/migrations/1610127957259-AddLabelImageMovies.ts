import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLabelImageMovies1610127957259
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('movies', 'image');
  }
}
