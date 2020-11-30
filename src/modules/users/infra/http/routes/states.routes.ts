import { Router } from 'express';

import StatesController from '../controllers/StatesController';
// import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const statesRouter = Router();
const statesController = new StatesController();

// statesRouter.use(ensureAuthenticated);

statesRouter.get('/', statesController.index);

export default statesRouter;
