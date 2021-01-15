import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import uploadConfig from '@config/upload';

import ThemesClassController from '../controllers/ThemesClassController';
import ThemesController from '../controllers/ThemesController';
import ThemesCourseDisciplineController from '../controllers/ThemesCourseDisciplineController';

const upload = multer(uploadConfig.multer);

const themesRouter = Router();
const themesController = new ThemesController();
const themesClassController = new ThemesClassController();

const themesCourseDisciplineController = new ThemesCourseDisciplineController();

themesRouter.use(ensureAuthenticated);

/*
themesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      theme: Joi.string().required(),
      movie_id: Joi.string().required(),
      discipline_id: Joi.string().required(),
    },
  }),
  themesController.create,
);

themesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      theme: Joi.string().required(),
    },
  }),
  themesController.update,
); */

themesRouter.post('/', themesController.create);
themesRouter.put('/', upload.single('file'), themesController.update);

themesRouter.get('/', themesController.index);
themesRouter.get('/:discipline_id', themesController.show);

themesRouter.get(
  '/courses/disciplines/:course_id/:discipline_id',
  themesCourseDisciplineController.index,
);

themesRouter.get(
  '/disciplines/:course_discipline_id',
  themesClassController.index,
);

export default themesRouter;
