import { Request, Response } from 'express';
import * as Yup from 'yup';
import { RateRepository } from '../repositories/rate.repository';
import conn from '../config/db/index';

export default class RateController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            product_id: Yup.number().required(),
            user_id: Yup.number().required(),
            points: Yup.number().required(),
            comment: Yup.string()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { product_id, user_id, points, comment } = request.body;
        
        const rateRepository = new RateRepository(conn);
        const rate = await rateRepository.create(product_id, user_id, points, comment);

        return response.status(201).json({ rate });
    }

    async findAll(request: Request, response: Response) {
        
        const rateRepository = new RateRepository(conn);
        const rates = await rateRepository.findAll();

        return response.json({ rates });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            points: Yup.number(),
            comment: Yup.string()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { points, comment } = request.body;
        const { id } = request.params;
        
        const rateRepository = new RateRepository(conn);
        const rate = await rateRepository.update(parseInt(id), points, comment);

        return response.status(201).json({ rate });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const rateRepository = new RateRepository(conn);
        const rate = await rateRepository.delete(parseInt(id));

        return response.json({ rate });
    }
}