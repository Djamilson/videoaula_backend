import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import CommentsAnswersController from '../controllers/CommentsAnswersController';

const commentsAnswersRouter = Router();
const commentsAnswersController = new CommentsAnswersController();

commentsAnswersRouter.use(ensureAuthenticated);

commentsAnswersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      comment_answer: Joi.string().required(),
      comment_id: Joi.string().required(),
    },
  }),
  commentsAnswersController.create,
);

commentsAnswersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      comment_answer: Joi.string().required(),
    },
  }),
  commentsAnswersController.update,
);

commentsAnswersRouter.delete('/:idAnswer', commentsAnswersController.destroy);

export default commentsAnswersRouter;
