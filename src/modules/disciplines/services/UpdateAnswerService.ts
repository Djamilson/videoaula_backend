import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CommentAnswer from '../infra/typeorm/entities/CommentAnswer';
import ICommentsAnswersRepository from '../repositories/ICommentsAnswersRepository';

interface IRequest {
  id: string;
  comment_answer: string;
}

@injectable()
class UpdateAnswerService {
  constructor(
    @inject('CommentsAnswersRepository')
    private commentsAnswersRepository: ICommentsAnswersRepository,
  ) {}

  public async execute({
    id,
    comment_answer,
  }: IRequest): Promise<CommentAnswer> {
    const answerExit = await this.commentsAnswersRepository.findById(id);

    if (!answerExit) {
      throw new AppError('Comment not found');
    }

    answerExit.comment_answer = comment_answer;

    return this.commentsAnswersRepository.save(answerExit);
  }
}

export default UpdateAnswerService;
