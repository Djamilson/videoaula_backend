import ICreateCommentAnswerDTO from '../dtos/ICreateCommentAnswerDTO';
import CommentAnswer from '../infra/typeorm/entities/CommentAnswer';

export default interface ICommentsAnswersRepository {
  findById(id: string): Promise<CommentAnswer | undefined>;
  findByCommentAnswer(
    comment_answer: string,
  ): Promise<CommentAnswer | undefined>;
  create(data: ICreateCommentAnswerDTO): Promise<CommentAnswer>;
  save(comment_answer: CommentAnswer): Promise<CommentAnswer>;
  delete(id: string): Promise<void>;
}
