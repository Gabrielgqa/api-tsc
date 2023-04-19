import { Router } from 'express';
import ProductController from '../../controllers/product.controller';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.post('/', productController.create);
productsRouter.get('/', productController.findAll);
productsRouter.get('/:id', productController.find);
productsRouter.put('/:id', productController.update);
productsRouter.delete('/:id', productController.delete);

export default productsRouter;