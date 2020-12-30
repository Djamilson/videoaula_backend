import { inject, injectable } from 'tsyringe';

import IListCommentDTO from '../dtos/IListCommentDTO';
import Comment from '../infra/typeorm/entities/Comment';
import CommentAnswer from '../infra/typeorm/entities/CommentAnswer';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  movie_id: string;
}

function sortByDate(a: CommentAnswer, b: CommentAnswer) {
  if (a.created_at > b.created_at) {
    return -1;
  }
  if (a.created_at < b.created_at) {
    return 1;
  }
  return 0;
}

@injectable()
class ListCommentsByMovieIdService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    movie_id,
  }: IRequest): Promise<IListCommentDTO[] | undefined> {
    const newList = await this.commentsRepository.findAllCommentByMovieId(
      movie_id,
    );

    const serealizableComments = newList?.map((item: Comment) => {
      const comments = {
        id: item.id,
        comment: item.comment,
        movie_id: item.movie_id,
        created_at: item.created_at,
        user: {
          id: item.user.id,
          name: item.user.person.name,
          avatar_url: item.user.person?.getAvatarUrl(),
        },
        comment_answers: item.comment_answers
          ?.sort(sortByDate)
          .map((answer: CommentAnswer) => {
            return {
              id: answer.id,
              comment_answer: answer.comment_answer,
              created_at: answer.created_at,
              user: {
                id: answer.user.id,
                name: answer.user.person.name,
                avatar_url: answer.user.person?.getAvatarUrl(),
              },
            };
          }),
      };

      return comments;
    });

    return serealizableComments;
  }
}

export default ListCommentsByMovieIdService;
