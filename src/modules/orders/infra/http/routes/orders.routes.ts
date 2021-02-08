import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import OrdersBoletoController from '../controller/OrdersBoletoController';
import OrdersCardController from '../controller/OrdersCardController';

const ordersRouter = Router();
const ordersCardController = new OrdersCardController();
const ordersBoletoController = new OrdersBoletoController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/payments/card/new', ordersCardController.create);
ordersRouter.post('/payments/boleto/new', ordersBoletoController.create);
ordersRouter.get('/', ordersCardController.index);
ordersRouter.get('/:id', ordersCardController.show);

export default ordersRouter;
