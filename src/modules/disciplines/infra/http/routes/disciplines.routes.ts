import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import AllDisciplinesController from '../controllers/AllDisciplinesController';
import DisciplinesController from '../controllers/DisciplinesController';

const disciplinesRouter = Router();
const disciplinesController = new DisciplinesController();
const allDisciplinesController = new AllDisciplinesController();

disciplinesRouter.use(ensureAuthenticated);
disciplinesRouter.get('/:id', disciplinesController.show);

disciplinesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  disciplinesController.create,
);

disciplinesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  disciplinesController.update,
);

disciplinesRouter.get('/', disciplinesController.index);
// para o select dentro do add disciplina no curso
disciplinesRouter.get('/all', allDisciplinesController.index);

export default disciplinesRouter;
