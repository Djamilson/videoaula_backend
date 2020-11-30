import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import Comment from '../infra/typeorm/entities/Comment';

export default interface ICommentsRepository {
  findById(id: string): Promise<Comment | undefined>;
  findByComment(comment: string): Promise<Comment | undefined>;
  findAllCommentByMovieId(movie_id: string): Promise<Comment[] | undefined>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
}
