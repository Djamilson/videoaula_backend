import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import CoursesDisciplinesController from '../controllers/CoursesDisciplinesController';
import SelectCourseDisciplinesController from '../controllers/SelectCoursesDisciplinesController';
import TableCourseDisciplinesController from '../controllers/TableCoursesDisciplinesController';

const coursesDisciplinesRouter = Router();
const coursesDisciplinesController = new CoursesDisciplinesController();

const selectCourseDisciplinesController = new SelectCourseDisciplinesController();
const tableCourseDisciplinesController = new TableCourseDisciplinesController();

coursesDisciplinesRouter.use(ensureAuthenticated);

coursesDisciplinesRouter.get('/:course_id', coursesDisciplinesController.index);

coursesDisciplinesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      discipline_id: Joi.string().required(),
      course_id: Joi.string().required(),
    },
  }),
  coursesDisciplinesController.create,
);

/*
coursesDisciplinesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      discipline_id: Joi.string().required(),
      course_id: Joi.string().required(),
    },
  }),
  coursesDisciplinesController.update,
); */

// para o select dentro do menu aula, para adicionar aula ao curso
coursesDisciplinesRouter.get(
  '/:course_id/select',
  selectCourseDisciplinesController.index,
);

// para a table aula, para adicionar aula ao curso
coursesDisciplinesRouter.get(
  '/:course_id/table',
  tableCourseDisciplinesController.index,
);

export default coursesDisciplinesRouter;
