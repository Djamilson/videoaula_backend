import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import OrdersCoursesController from '../controller/OrdersCoursesController';

const ordersCoursesRouter = Router();
const ordersCoursesController = new OrdersCoursesController();

ordersCoursesRouter.use(ensureAuthenticated);

ordersCoursesRouter.get('/list', ordersCoursesController.index);

export default ordersCoursesRouter;
