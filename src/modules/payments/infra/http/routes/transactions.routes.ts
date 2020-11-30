import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.get('/orders/:order_id', transactionsController.show);
transactionsRouter.delete('/:id', transactionsController.destroy);

export default transactionsRouter;
