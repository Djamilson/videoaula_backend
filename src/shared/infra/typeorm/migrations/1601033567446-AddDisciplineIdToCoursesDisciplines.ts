import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddDisciplineIdToCoursesDisciplines1601033567446
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_disciplines',
      new TableColumn({
        name: 'discipline_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_disciplines',
      new TableForeignKey({
        name: 'CoursesDisciplinesDiscipline',
        columnNames: ['discipline_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'disciplines',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'courses_disciplines',
      'CoursesDisciplinesDiscipline',
    );

    await queryRunner.dropColumn('courses_disciplines', 'disciplines_id');
  }
}
