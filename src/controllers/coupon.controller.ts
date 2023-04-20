import { Request, Response } from 'express';
import * as Yup from 'yup';
import { CouponRepository } from '../repositories/coupon.repository';
import conn from '../config/db/index';

export default class CouponController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            percentage: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, percentage } = request.body;
        
        const couponRepository = new CouponRepository(conn);
        const coupon = await couponRepository.create(name, description, percentage);

        return response.status(201).json({ coupon });
    }

    async findAll(request: Request, response: Response) {
        
        const couponRepository = new CouponRepository(conn);
        const coupons = await couponRepository.findAll();

        return response.json({ coupons });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const couponRepository = new CouponRepository(conn);
        const coupon = await couponRepository.findById(parseInt(id));

        return response.json({ coupon });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            percentage: Yup.string().required(),
            active: Yup.boolean()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { name, description, percentage, active } = request.body;
        const { id } = request.params;
        
        const couponRepository = new CouponRepository(conn);
        const coupon = await couponRepository.update(parseInt(id), name, description, percentage, active);

        return response.status(201).json({ coupon });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const couponRepository = new CouponRepository(conn);
        const coupon = await couponRepository.delete(parseInt(id));

        return response.json({ coupon });
    }
}