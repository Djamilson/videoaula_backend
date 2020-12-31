import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  comment: string;
  movie_id: string;
  user_id: string;
}

interface IComment {
  comment: string;
  comment_answers?: Array<{}>;
  created_at: Date;
  id: string;
  movie_id: string;
  user: {
    avatar_url?: string | null;
    id?: string;
    name?: string;
  };
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
  }: IRequest): Promise<IComment> {
    const checkCommentExists = await this.commentsRepository.findByComment(
      comment,
    );

    if (checkCommentExists) {
      throw new AppError('Comment already used.');
    }

    const newComment = await this.commentsRepository.create({
      comment,
      user_id,
      movie_id,
    });

    console.log('Meu commmm>>', newComment);

    const userExist = await this.usersRepository.findById(user_id);

    const dataComment = {
      comment: newComment.comment,
      comment_answers: [],
      created_at: newComment.created_at,
      id: newComment.id,
      movie_id: newComment.movie_id,

      user: {
        id: userExist?.id,
        name: userExist?.person.name,
        avatar_url: userExist?.person?.getAvatarUrl(),
      },
    };

    return dataComment;
  }
}

export default CreateCommentService;
