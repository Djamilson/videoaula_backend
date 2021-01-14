import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICommentAnswerDTO from '../dtos/ICommentAnswerDTO';
import ICommentsAnswersRepository from '../repositories/ICommentsAnswersRepository';

interface IRequest {
  comment_answer: string;
  comment_id: string;
  user_id: string;
}

@injectable()
class CreateCommentAnswerService {
  constructor(
    @inject('CommentsAnswersRepository')
    private commentsAnswersRepository: ICommentsAnswersRepository,
  ) {}

  public async execute({
    comment_answer,
    comment_id,
    user_id,
  }: IRequest): Promise<ICommentAnswerDTO | undefined> {
    const checkCommentAnswerExists = await this.commentsAnswersRepository.findByCommentAnswer(
      comment_answer,
    );

    if (checkCommentAnswerExists) {
      throw new AppError('CommentAnswer already used.');
    }

    const newAnswer = this.commentsAnswersRepository.create({
      comment_answer,
      comment_id,
      user_id,
    });

    const commentAnswer = await this.commentsAnswersRepository.findById(
      (await newAnswer).id,
    );
    if (commentAnswer) {
      return {
        id: commentAnswer?.id,
        comment_answer: commentAnswer?.comment_answer,
        comment_id: commentAnswer?.comment_id,
        created_at: commentAnswer?.created_at,
        user: {
          id: commentAnswer?.user.id,
          name: commentAnswer?.user.person.name,
          avatar_url: commentAnswer?.user.person.getAvatarUrl(),
        },
      };
    }
  }
}

export default CreateCommentAnswerService;
