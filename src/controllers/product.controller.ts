import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCategoryRepository } from '../repositories/product_category.repository';
import { Product } from '../entities/Product';
import conn from '../config/db/index';

export default class ProductController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            stock: Yup.number().required(),
            categories_id: Yup.array().of(Yup.number()).required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, price, stock, categories_id } = request.body;
        
        const productRepository = new ProductRepository(conn);
        const product: Product = await productRepository.create(name, description, price, stock);

        const productCategoryRepository = new ProductCategoryRepository(conn);

        for (const category_id of categories_id) {
            const id = await productCategoryRepository.findByProductCategoryId(product.id, parseInt(category_id));
            if(id) {
                return;
            }
            await productCategoryRepository.create(product.id, category_id);
        }

        return response.status(201).json({ message: "Product created!" });
    }

    async findAll(request: Request, response: Response) {
        
        const productRepository = new ProductRepository(conn);
        const products = await productRepository.findAll();

        return response.json({ products });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const productRepository = new ProductRepository(conn);
        const product = await productRepository.findById(parseInt(id));

        return response.json({ product });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            description: Yup.string(),
            price: Yup.number(),
            stock: Yup.number(),
            available: Yup.boolean(),
            highlight: Yup.boolean(),
            promotion: Yup.boolean(),
            promotional_price: Yup.number()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, price, stock, available, highlight, promotion, promotional_price } = request.body;
        const { id } = request.params;
        
        const productRepository = new ProductRepository(conn);
        const product = await productRepository.update(parseInt(id), name, description, price, stock, available, highlight, promotion, promotional_price);

        return response.status(200).json({ product });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const productRepository = new ProductRepository(conn);
        const product = await productRepository.delete(parseInt(id));

        return response.status(200).json({ product });
    }
}