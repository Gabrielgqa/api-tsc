import { Router } from 'express';

import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import addressesRouter from './addresses.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/categories', categoriesRouter);

export default routes;