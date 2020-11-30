import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AddressesController from '../controllers/AddressesController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      number: Joi.number().required(),
      street: Joi.string().required(),
      complement: Joi.string().required(),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city_id: Joi.string().required(),
    },
  }),
  addressesController.create,
);

addressesRouter.get('/:person_id', addressesController.index);

export default addressesRouter;
