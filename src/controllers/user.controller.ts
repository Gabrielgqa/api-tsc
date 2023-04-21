import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { UserRepository } from '../repositories/user.repository';
import { UserCartRepository } from '../repositories/user_cart.repository';
import conn from '../config/db/index';

export default class UserController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const {email, password} = request.body;
        const pass = bcrypt.hashSync(password, 10);
        
        const userRepository = new UserRepository(conn);
        const user = await userRepository.create(email, pass);

        const userCartRepository = new UserCartRepository(conn);
        await userCartRepository.create(user.id);

        return response.status(201).json({ user });
    }

    async findAll(request: Request, response: Response) {
        
        const userRepository = new UserRepository(conn);
        const users = await userRepository.findAll();

        return response.json({ users });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const userRepository = new UserRepository(conn);
        const user = await userRepository.findById(parseInt(id));

        return response.json({ user });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { email, password } = request.body;
        const { id } = request.params;

        const pass = bcrypt.hashSync(password, 10);
        
        const userRepository = new UserRepository(conn);
        const user = await userRepository.update(parseInt(id), email, pass);

        return response.status(201).json({ user });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const userRepository = new UserRepository(conn);
        const user = await userRepository.delete(parseInt(id));

        return response.json({ user });
    }
}