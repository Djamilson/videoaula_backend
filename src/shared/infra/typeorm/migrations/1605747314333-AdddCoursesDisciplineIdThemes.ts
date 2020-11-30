import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AdddCoursesDisciplineIdThemes1605747314333
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'themes',
      new TableColumn({
        name: 'course_discipline_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'themes',
      new TableForeignKey({
        name: 'CourseDisciplineThemes',
        columnNames: ['course_discipline_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses_disciplines',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('themes', 'CourseDisciplineThemes');

    await queryRunner.dropColumn('themes', 'course_discipline_id');
  }
}
