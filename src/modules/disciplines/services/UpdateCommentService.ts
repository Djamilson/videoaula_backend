import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  id: string;
  comment: string;
}

@injectable()
class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({ id, comment }: IRequest): Promise<Comment> {
    const commentExit = await this.commentsRepository.findById(id);

    if (!commentExit) {
      throw new AppError('Comment not found');
    }

    commentExit.comment = comment;

    return this.commentsRepository.save(commentExit);
  }
}

export default UpdateCommentService;
