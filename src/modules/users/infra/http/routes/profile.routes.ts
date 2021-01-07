import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';
import DocumentsController from '../controllers/DocumentsController';

const profileRouter = Router();
const profileController = new ProfileController();
const documentsController = new DocumentsController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.put(
  '/documents',
  celebrate({
    [Segments.BODY]: {
      birdthDate: Joi.string().required(),
      cpf: Joi.string().required(),
      rg: Joi.string(),
      rgss: Joi.string(),
    },
  }),
  documentsController.update,
);

export default profileRouter;
