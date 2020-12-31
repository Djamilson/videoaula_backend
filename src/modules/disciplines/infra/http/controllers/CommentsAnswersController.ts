import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentAnswerService from '@modules/disciplines/services/CreateCommentAnswerService';
import DeleteAnswerService from '@modules/disciplines/services/DeleteAnswerService';
import UpdateAnswerService from '@modules/disciplines/services/UpdateAnswerService';

export default class CommentsAnswersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { zip_code } = request.params;

    const user_id = request.user.id;

    return response.json({ fee: true });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { comment_answer, comment_id } = req.body;
      console.log('req.body::', req.body);
      const createCommentAnswer = container.resolve(CreateCommentAnswerService);

      const newCommentAnswer = await createCommentAnswer.execute({
        comment_answer,
        comment_id,
        user_id,
      });

      return res.json(newCommentAnswer);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      console.log('req.body::', req.body);

      console.log('=<<<:', req.body);

      const updateAnswerService = container.resolve(UpdateAnswerService);

      const { comment_answer, id } = req.body;

      const newAnswer = await updateAnswerService.execute({
        comment_answer,
        id,
      });

      return res.json(newAnswer);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAnswer } = request.params;

    const answerService = container.resolve(DeleteAnswerService);

    await answerService.execute({
      idAnswer,
    });

    return response.status(204).json({ success: true });
  }
}
