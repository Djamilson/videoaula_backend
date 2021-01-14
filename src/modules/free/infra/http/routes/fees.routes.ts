import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import FeesController from '../controller/FeesController';
import ZipCodeController from '../controller/SearcherZipCodeController';

const feesRouter = Router();
const feesController = new FeesController();
const zipCodeController = new ZipCodeController();

feesRouter.use(ensureAuthenticated);

feesRouter.get('/:zip_code', feesController.show);
feesRouter.get('/searcher/:zip_code', zipCodeController.show);

export default feesRouter;
