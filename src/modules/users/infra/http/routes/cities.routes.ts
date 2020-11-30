import { Router } from 'express';

import CitiesController from '../controllers/CitiesController';
//import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const citiesRouter = Router();
const citiesController = new CitiesController();

//citiesRouter.use(ensureAuthenticated);

citiesRouter.get('/:state_id/select', citiesController.index);

export default citiesRouter;
