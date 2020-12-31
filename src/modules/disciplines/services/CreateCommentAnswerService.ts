import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAnswerDTO from '../dtos/IAnswerDTO';
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
  }: IRequest): Promise<IAnswerDTO | undefined> {
    console.log('Service: ', comment_answer, comment_id, user_id);

    const checkCommentAnswerExists = await this.commentsAnswersRepository.findByCommentAnswer(
      comment_answer,
    );

    if (checkCommentAnswerExists) {
      throw new AppError('CommentAnswer already used.');
    }

    const newAnswer = await this.commentsAnswersRepository.create({
      comment_answer,
      comment_id,
      user_id,
    });

    const { id } = newAnswer;

    if (newAnswer) {
      const commentAnswer = await this.commentsAnswersRepository.findById(id);

      const dataAnswer = {
        id: commentAnswer?.id,
        comment_answer: commentAnswer?.comment_answer,
        created_at: commentAnswer?.created_at,
        user: {
          id: commentAnswer?.user?.id,
          name: commentAnswer?.user?.person?.name,
          avatar_url: commentAnswer?.user?.person.getAvatarUrl(),
        },
      };

      return dataAnswer;
    }
    return undefined;
  }
}

export default CreateCommentAnswerService;
