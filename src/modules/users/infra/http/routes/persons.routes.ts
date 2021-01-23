import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import DocumentsController from '../controllers/DocumentsController';
import PersonsController from '../controllers/PersonsController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const personsRouter = Router();
const personsController = new PersonsController();
const documentsController = new DocumentsController();

personsRouter.use(ensureAuthenticated);

personsRouter.get('/:personId', personsController.show);
personsRouter.put(
  '/documents',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
      rg: Joi.string().required(),
      rgss: Joi.string().required(),
      birdthDate: Joi.string().required(),
    },
  }),
  documentsController.update,
);

export default personsRouter;
