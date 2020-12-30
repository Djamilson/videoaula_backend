import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

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

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    comment,
    movie_id,
    user_id,
  }: IRequest): Promise<Comment> {
    const checkCommentExists = await this.commentsRepository.findByComment(
      comment,
    );

    if (checkCommentExists) {
      throw new AppError('Comment already used.');
    }

    const newComment = this.commentsRepository.create({
      comment,
      user_id,
      movie_id,
    });

    const userExist = await this.usersRepository.findById(user_id);

    const dataComment = {
      ...newComment,
      user: {
        id: userExist?.id,
        name: userExist?.person.name,
        avatar_url: userExist?.person?.getAvatarUrl(),
      },
      comment_answers: [],
    };

    return dataComment;
  }
}

export default CreateCommentService;
