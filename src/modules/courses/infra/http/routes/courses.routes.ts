import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import uploadConfig from '@config/upload';

import CourseImageController from '../controllers/CourseImageController';
import CoursesController from '../controllers/CoursesController';
import CoursesSelectController from '../controllers/CoursesSelectController';

const coursesRouter = Router();

const coursesController = new CoursesController();
const coursesSelectController = new CoursesSelectController();
const courseImageController = new CourseImageController();

const upload = multer(uploadConfig.multer);

// tem que ser nessa order para não dar erro
coursesRouter.get('/select', coursesSelectController.index);
coursesRouter.get('/', coursesController.index);
coursesRouter.get('/:id', coursesController.show);

coursesRouter.use(ensureAuthenticated);

coursesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
    },
  }),
  upload.single('file'),
  coursesController.create,
);

coursesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
      id: Joi.string(),
    },
  }),
  coursesController.update,
);

coursesRouter.patch(
  '/image',
  upload.single('file'),
  courseImageController.update,
);

export default coursesRouter;
