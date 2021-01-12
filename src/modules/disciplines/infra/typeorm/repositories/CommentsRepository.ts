import { getRepository, Repository } from 'typeorm';

import ICreateCommentDTO from '@modules/disciplines/dtos/ICreateCommentDTO';
import ICommentsRepository from '@modules/disciplines/repositories/ICommentsRepository';

import Comment from '../entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findById(id: string): Promise<Comment | undefined> {
    const comment = await this.ormRepository.findOne(id);

    return comment;
  }

  public async findByComment(comment: string): Promise<Comment | undefined> {
    const objectComment = await this.ormRepository.findOne({ comment });

    return objectComment;
  }

  public async findAllCommentByMovieId(
    movie_id: string,
  ): Promise<Comment[] | undefined> {
    const comments = await this.ormRepository.find({
      where: { movie_id },

      relations: [
        'comment_answers',
        'user',
        'user.person',
        'comment_answers.user',
        'comment_answers.user.person',
      ],
      order: {
        created_at: 'DESC',
      },
    });

    return comments;
  }

  public async create(comment: ICreateCommentDTO): Promise<Comment> {
    const newComment = this.ormRepository.create(comment);

    await this.ormRepository.save(newComment);

    return newComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    return this.ormRepository.save(comment);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CommentsRepository;
