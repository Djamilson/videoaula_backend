import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentService from '@modules/disciplines/services/CreateCommentService';
import DeleteCommentService from '@modules/disciplines/services/DeleteCommentService';
import ListCommentsByMovieIdService from '@modules/disciplines/services/ListCommentsByMovieIdService';
import UpdateCommentService from '@modules/disciplines/services/UpdateCommentService';

export default class CommentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    // const { zip_code } = request.params;

    // const user_id = request.user.id;

    return response.json({ fee: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.params;

    const listCommentsService = container.resolve(ListCommentsByMovieIdService);

    const comments = await listCommentsService.execute({
      movie_id,
    });

    return response.json(classToClass(comments));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { comment, movie_id } = req.body;

      const createComment = container.resolve(CreateCommentService);

      const newComment = await createComment.execute({
        comment,
        movie_id,
        user_id,
      });

      return res.json(newComment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCommentService = container.resolve(UpdateCommentService);

      const { comment, id } = req.body;

      const newComment = await updateCommentService.execute({
        comment,
        id,
      });

      return res.json(newComment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idComment } = request.params;

    const commentsService = container.resolve(DeleteCommentService);

    await commentsService.execute({
      idComment,
    });

    return response.status(204).json({ success: true });
  }
}
