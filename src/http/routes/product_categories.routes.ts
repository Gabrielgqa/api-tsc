import { Router } from 'express';
import ProductCategoryController from '../../controllers/product_category.controller';

const productCategoriesRouter = Router();
const productCategoryController = new ProductCategoryController();

productCategoriesRouter.post('/', productCategoryController.create);
productCategoriesRouter.get('/:product_id', productCategoryController.findByProductId);
productCategoriesRouter.get('/:category_id', productCategoryController.findByCategoryId);
productCategoriesRouter.delete('/:product_id/:category_id', productCategoryController.delete);

export default productCategoriesRouter;