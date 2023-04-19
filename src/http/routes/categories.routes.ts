import { Router } from 'express';
import CategoryController from '../../controllers/category.controller';

const categoriesRouter = Router();
const categoryController = new CategoryController();

categoriesRouter.post('/', categoryController.create);
categoriesRouter.get('/', categoryController.findAll);
categoriesRouter.get('/:id', categoryController.find);
categoriesRouter.put('/:id', categoryController.update);
categoriesRouter.delete('/:id', categoryController.delete);

export default categoriesRouter;