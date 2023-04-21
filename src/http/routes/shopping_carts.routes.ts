import { Router } from 'express';
import ShoppingCartController from '../../controllers/shopping_cart.controller';

const shoppingCartsRouter = Router();
const shoppingCartController = new ShoppingCartController();

shoppingCartsRouter.post('/', shoppingCartController.create);
shoppingCartsRouter.get('/:cart_id', shoppingCartController.findByCardId);
shoppingCartsRouter.get('/:id', shoppingCartController.find);
shoppingCartsRouter.put('/:id', shoppingCartController.update);
shoppingCartsRouter.delete('/:id', shoppingCartController.delete);

export default shoppingCartsRouter;