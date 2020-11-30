import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

import multer from 'multer';
import uploadConfig from '@config/upload';
const upload = multer(uploadConfig.multer);

import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();



usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      groups: Joi.array().items(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  userAvatarController.update,
);

export default usersRouter;
