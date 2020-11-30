import { celebrate, Segments, Joi } from 'celebrate';

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import DisciplinesController from '../controllers/DisciplinesController';

import AllDisciplinesController from '../controllers/AllDisciplinesController';

const disciplinesRouter = Router();
const disciplinesController = new DisciplinesController();
const allDisciplinesController = new AllDisciplinesController();

disciplinesRouter.use(ensureAuthenticated);

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
//para o select dentro do add disciplina no curso
disciplinesRouter.get('/all', allDisciplinesController.index);



export default disciplinesRouter;
