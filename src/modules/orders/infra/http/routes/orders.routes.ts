import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/', ordersController.index);
ordersRouter.get('/:id', ordersController.show);

export default ordersRouter;
