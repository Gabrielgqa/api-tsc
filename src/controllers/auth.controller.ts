import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { UserRepository } from '../repositories/user.repository';
import conn from '../config/db/index';

export default class AuthController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const {email, password} = request.body;
        
        const clientRepository = new UserRepository(conn);
        const user = await clientRepository.findByCredentials(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return response.status(400).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string, { expiresIn: 300 });

        return response.status(200).json({ auth: true, token: token });
    }
}