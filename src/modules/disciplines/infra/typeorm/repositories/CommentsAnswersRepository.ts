import { getRepository, Repository } from 'typeorm';

import ICreateCommentAnswerDTO from '@modules/disciplines/dtos/ICreateCommentAnswerDTO';
import ICommentsAnswersRepository from '@modules/disciplines/repositories/ICommentsAnswersRepository';

import CommentAnswer from '../entities/CommentAnswer';

class CommentsAnswersRepository implements ICommentsAnswersRepository {
  private ormRepository: Repository<CommentAnswer>;

  constructor() {
    this.ormRepository = getRepository(CommentAnswer);
  }

  public async findById(id: string): Promise<CommentAnswer | undefined> {
    const commentAnswer = await this.ormRepository.findOne(id, {
      relations: ['user', 'user.person'],
    });

    return commentAnswer;
  }

  public async findByCommentAnswer(
    comment_answer: string,
  ): Promise<CommentAnswer | undefined> {
    const objectCommentAnswer = await this.ormRepository.findOne({
      comment_answer,
    });

    return objectCommentAnswer;
  }

  public async create(
    commentAnswer: ICreateCommentAnswerDTO,
  ): Promise<CommentAnswer> {
    const newCommentAnswer = this.ormRepository.create(commentAnswer);

    await this.ormRepository.save(newCommentAnswer);

    return newCommentAnswer;
  }

  public async save(comment_answer: CommentAnswer): Promise<CommentAnswer> {
    return this.ormRepository.save(comment_answer);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CommentsAnswersRepository;
