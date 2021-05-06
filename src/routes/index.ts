import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import usersRoutes from './users.routes';
import passwordRoutes from './password.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRoutes);

routes.use('/password', passwordRoutes);

export default routes;
