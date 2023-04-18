import { Router } from 'express';

import usersRouter from './users.routes';
import clientsRouter from './clients.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);

export default routes;