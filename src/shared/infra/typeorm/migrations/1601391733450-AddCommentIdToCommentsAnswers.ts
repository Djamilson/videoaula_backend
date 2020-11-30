import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCommentIdToCommentsAnswers1601391733450
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'comments_answers',
      new TableColumn({
        name: 'comment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'comments_answers',
      new TableForeignKey({
        name: 'CommentsAnswersComments',
        columnNames: ['comment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'comments_answers',
      'CommentsAnswersComments',
    );

    await queryRunner.dropColumn('comments_answers', 'comment_id');
  }
}
