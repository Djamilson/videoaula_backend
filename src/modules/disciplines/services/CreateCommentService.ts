import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  comment: string;
  movie_id: string;
  user_id: string;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    comment,
    movie_id,
    user_id,
  }: IRequest): Promise<Comment> {
    console.log('comment movie_id  user_id', comment, movie_id, user_id);
    const checkCommentExists = await this.commentsRepository.findByComment(
      comment,
    );

    if (checkCommentExists) {
      throw new AppError('Comment already used.');
    }

    console.log('comment movie_id  user_id', comment, movie_id, user_id);
    const newComment = this.commentsRepository.create({
      comment,
      user_id,
      movie_id,
    });

    return newComment;
  }
}

export default CreateCommentService;
