import { Router } from 'express';

import InfoClientsController from '../controllers/InfoClientsController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const infoClientsRouter = Router();
const infoClientsController = new InfoClientsController();

infoClientsRouter.use(ensureAuthenticated);

infoClientsRouter.put('/', infoClientsController.update);

export default infoClientsRouter;
