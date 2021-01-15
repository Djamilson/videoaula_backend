import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICommentsAnswersRepository from '../repositories/ICommentsAnswersRepository';

interface IRequest {
  idAnswer: string;
}

@injectable()
class DeleteAnswerService {
  constructor(
    @inject('CommentsAnswersRepository')
    private commentsAnswersRepository: ICommentsAnswersRepository,
  ) {}

  public async execute({ idAnswer }: IRequest): Promise<void> {
    const checkAnswerExists = await this.commentsAnswersRepository.findById(
      idAnswer,
    );

    if (!checkAnswerExists) {
      throw new AppError('Answer does not exist.');
    }

    await this.commentsAnswersRepository.delete(checkAnswerExists.id);
  }
}

export default DeleteAnswerService;
