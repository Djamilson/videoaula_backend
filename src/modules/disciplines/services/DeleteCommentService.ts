import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  idComment: string;
}

@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({ idComment }: IRequest): Promise<void> {
    console.log('Opa:', idComment);
    const checkCommentExists = await this.commentsRepository.findById(
      idComment,
    );

    if (!checkCommentExists) {
      throw new AppError('Comment does not exist.');
    }
    console.log('Opa: 2', idComment);
    await this.commentsRepository.delete(checkCommentExists.id);
  }
}

export default DeleteCommentService;
