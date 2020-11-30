import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import PhonesController from '../controllers/PhonesController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const phonesRouter = Router();
const phonesController = new PhonesController();

phonesRouter.use(ensureAuthenticated);

phonesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      prefix: Joi.string().required(),
      number: Joi.string().required(),
    },
  }),
  phonesController.create,
);

export default phonesRouter;
