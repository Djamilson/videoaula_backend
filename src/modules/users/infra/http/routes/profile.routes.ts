import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import DocumentsController from '../controllers/DocumentsController';
import ProfileController from '../controllers/ProfileController';
import ProfilePasswordController from '../controllers/ProfilePasswordController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const profileRouter = Router();
const profileController = new ProfileController();
const documentsController = new DocumentsController();
const profilePasswordController = new ProfilePasswordController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  profileController.update,
);

profileRouter.put(
  '/passwords',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profilePasswordController.update,
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
