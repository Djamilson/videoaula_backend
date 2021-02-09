import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import TransactionsBoletoController from '../controllers/TransactionsBoletoController';
import TransactionsCardController from '../controllers/TransactionsCardController';

const transactionsRouter = Router();
const transactionsCardController = new TransactionsCardController();
const transactionsBoletoController = new TransactionsBoletoController();

transactionsRouter.post('/card/postbacks', transactionsCardController.update);
transactionsRouter.get('/boleto/postbacks', transactionsBoletoController.index);

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.get('/orders/:order_id', transactionsCardController.show);
transactionsRouter.delete('/:id', transactionsCardController.destroy);

export default transactionsRouter;
