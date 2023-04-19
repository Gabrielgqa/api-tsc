import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ProductRepository } from '../repositories/product.repository';
import conn from '../config/db/index';

export default class ProductController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            stock: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, price, stock } = request.body;
        
        const productRepository = new ProductRepository(conn);
        await productRepository.create(name, description, price, stock, true, false);

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
            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            stock: Yup.number().required(),
            available: Yup.boolean().required(),
            highlight: Yup.boolean().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, price, stock, available, highlight } = request.body;
        const { id } = request.params;
        
        const productRepository = new ProductRepository(conn);
        const product = await productRepository.update(parseInt(id), name, description, price, stock, available, highlight);

        return response.status(200).json({ product });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const productRepository = new ProductRepository(conn);
        const product = await productRepository.delete(parseInt(id));

        return response.status(200).json({ product });
    }
}