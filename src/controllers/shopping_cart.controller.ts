import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ShoppingCartRepository } from '../repositories/shopping_cart.repository';
import { ProductRepository } from '../repositories/product.repository';
import conn from '../config/db/index';

export default class ProductCategoryController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            cart_id: Yup.number().required(),
            product_id: Yup.number().required(),
            quantity: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { cart_id, product_id, quantity } = request.body;

        const shoppingCartRepository = new ShoppingCartRepository(conn);

        const productRepository = new ProductRepository(conn);
        const product = await productRepository.findById(product_id);

        const sub_price = quantity * product.price;

        await shoppingCartRepository.create(cart_id, product_id, quantity, sub_price);

        return response.status(201).json({ message: "Product add to shopping cart!" });
    }

    async findByCardId(request: Request, response: Response) {

        const { card_id } = request.params;
        
        const shoppingCartRepository = new ShoppingCartRepository(conn);
        const shopping_carts = await shoppingCartRepository.findByCardId(parseInt(card_id));

        return response.json({ shopping_carts });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const shoppingCartRepository = new ShoppingCartRepository(conn);
        const shoppingCart = await shoppingCartRepository.findById(parseInt(id));

        return response.json({ shoppingCart });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            quantity: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { quantity } = request.body;
        const { id } = request.params;

        const shoppingCartRepository = new ShoppingCartRepository(conn);
        const cart = await shoppingCartRepository.findById(parseInt(id));

        const productRepository = new ProductRepository(conn);
        const product = await productRepository.findById(cart.product_id);

        const sub_price = quantity * product.price;
      
        const shopping_cart = await shoppingCartRepository.update(parseInt(id), quantity, sub_price);

        return response.status(201).json({ shopping_cart });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const shoppingCartRepository = new ShoppingCartRepository(conn);
        const shopping_cart = await shoppingCartRepository.delete(parseInt(id));

        return response.status(200).json({ shopping_cart });
    }
}