import { Router } from 'express';

import coursesRouter from '@modules/courses/infra/http/routes/courses.routes';
import commentsRouter from '@modules/disciplines/infra/http/routes/comments.routes';
import commentsAnswersRouter from '@modules/disciplines/infra/http/routes/commentsanswers.routes';
import coursesDisciplinesRouter from '@modules/disciplines/infra/http/routes/coursesdisciplines.routes';
import disciplinesRouter from '@modules/disciplines/infra/http/routes/disciplines.routes';
import moviesRouter from '@modules/disciplines/infra/http/routes/movies.routes';
import themesRouter from '@modules/disciplines/infra/http/routes/themes.routes';
import ordersCoursesRouter from '@modules/orders/infra/http/routes/orders.courses.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import transactionsRouter from '@modules/payments/infra/http/routes/transactions.routes';
import addressesRouter from '@modules/users/infra/http/routes/addresses.routes';
import citiesRouter from '@modules/users/infra/http/routes/cities.routes';
import groupsRouter from '@modules/users/infra/http/routes/groups.routes';
import infoClientsRouter from '@modules/users/infra/http/routes/infoclients.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import phonesRouter from '@modules/users/infra/http/routes/phones.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import statesRouter from '@modules/users/infra/http/routes/states.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/groups', groupsRouter);

routes.use('/infoclients', infoClientsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/phones', phonesRouter);

routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/disciplines', disciplinesRouter);
routes.use('/movies', moviesRouter);
routes.use('/comments', commentsRouter);
routes.use('/comments/answers', commentsAnswersRouter);

routes.use('/orders', ordersRouter);
routes.use('/orders/courses', ordersCoursesRouter);
routes.use('/transactions', transactionsRouter);

routes.use('/cities', citiesRouter);
routes.use('/states', statesRouter);

routes.use('/courses', coursesRouter);
routes.use('/disciplines', disciplinesRouter);
routes.use('/movies', moviesRouter);

routes.use('/courses/disciplines', coursesDisciplinesRouter);
routes.use('/themes', themesRouter);

export default routes;
