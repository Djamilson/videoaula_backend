import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import MenusController from '../controllers/MenusController';

const menusRouter = Router();

const menusController = new MenusController();

menusRouter.use(ensureAuthenticated);

// tem que ser nessa order para não dar erro
menusRouter.get('/', menusController.index);
menusRouter.get('/:id', menusController.show);

menusRouter.post(
  '/new',
  celebrate({
    [Segments.BODY]: {
      label: Joi.string(),
      path: Joi.number(),
    },
  }),
  menusController.create,
);

export default menusRouter;
