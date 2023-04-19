import { Request, Response } from 'express';
import * as Yup from 'yup';
import { CategoryRepository } from '../repositories/category.repository';
import conn from '../config/db/index';

export default class CategoryController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description } = request.body;
        
        const categoryRepository = new CategoryRepository(conn);
        await categoryRepository.create(name, description);

        return response.status(201).json({ message: "Category created!" });
    }

    async findAll(request: Request, response: Response) {
        
        const categoryRepository = new CategoryRepository(conn);
        const categories = await categoryRepository.findAll();

        return response.json({ categories });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const categoryRepository = new CategoryRepository(conn);
        const category = await categoryRepository.findById(parseInt(id));

        return response.json({ category });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description } = request.body;
        const { id } = request.params;
        
        const categoryRepository = new CategoryRepository(conn);
        const category = await categoryRepository.update(parseInt(id), name, description);

        return response.status(200).json({ category });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const categoryRepository = new CategoryRepository(conn);
        const category = await categoryRepository.delete(parseInt(id));

        return response.status(200).json({ category });
    }
}