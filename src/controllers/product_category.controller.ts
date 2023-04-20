import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ProductCategoryRepository } from '../repositories/product_category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';
import conn from '../config/db/index';

export default class ProductCategoryController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            product_id: Yup.number().required(),
            categories_id: Yup.array().of(Yup.number()).required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { product_id, categories_id } = request.body;

        const productCategoryRepository = new ProductCategoryRepository(conn);

        for (const category_id of categories_id) {
            const id = await productCategoryRepository.findByProductCategoryId(parseInt(product_id), parseInt(category_id));
            if(id) {
                return;
            }
            await productCategoryRepository.create(product_id, category_id);
        }

        return response.status(201).json({ message: "Product Categories created!" });
    }

    async findByProductId(request: Request, response: Response) {

        const { product_id } = request.params;
        
        const productCategoryRepository = new ProductCategoryRepository(conn);
        const categories_id = await productCategoryRepository.findByProductId(parseInt(product_id));

        const categoryRepository = new CategoryRepository(conn);
        let categories: any = [];

        for (const category_id of categories_id) {
            const product = await categoryRepository.findById(category_id);
            categories.push(product);
        }

        return response.json({ categories });
    }

    async findByCategoryId(request: Request, response: Response) {

        const { category_id } = request.params;
        
        const productCategoryRepository = new ProductCategoryRepository(conn);
        const products_id = await productCategoryRepository.findByProductId(parseInt(category_id));

        const productRepository = new ProductRepository(conn);
        let products: any = [];

        for (const product_id of products_id) {
            const product = await productRepository.findById(product_id);
            products.push(product);
        }

        return response.json({ products });
    }

    async delete(request: Request, response: Response) {

        const { product_id, category_id } = request.params;
        
        const productCategoryRepository = new ProductCategoryRepository(conn);
        const id = await productCategoryRepository.findByProductCategoryId(parseInt(product_id), parseInt(category_id));
        const category = await productCategoryRepository.delete(parseInt(id));

        return response.status(200).json({ category });
    }
}