import { Router } from 'express';

import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import addressesRouter from './addresses.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/addresses', addressesRouter);

export default routes;