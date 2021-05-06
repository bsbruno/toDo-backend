import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import taskRoutes from './tasks.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRoutes);
routes.use('/task', taskRoutes);

export default routes;
