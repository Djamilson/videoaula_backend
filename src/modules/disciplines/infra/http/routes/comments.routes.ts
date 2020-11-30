import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.use(ensureAuthenticated);

commentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      comment: Joi.string().required(),
      movie_id: Joi.string().required(),
    },
  }),
  commentsController.create,
);

commentsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      comment: Joi.string().required(),
      id: Joi.string().required(),
    },
  }),
  commentsController.update,
);

commentsRouter.get('/:movie_id', commentsController.index);

commentsRouter.delete('/:idComment', commentsController.destroy);

export default commentsRouter;
