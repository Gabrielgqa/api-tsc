import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import addressesRouter from './addresses.routes';
import categoriesRouter from './categories.routes';
import productsRouter from './products.routes';
import productCategoriesRouter from './product_categories.routes';
import couponsRouter from './coupons.routes';

const routes = Router();
const authController = new AuthController();

routes.post('/auth', authController.create);

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/product-categories', productCategoriesRouter);
routes.use('/coupons', couponsRouter);

export default routes;