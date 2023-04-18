import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ClientRepository } from '../repositories/client.repository';
import conn from '../config/db/index';

export default class UserController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            cpf: Yup.string().required(),
            phone: Yup.string().required(),
            user_id: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const {first_name, last_name, cpf, phone, user_id, birth_date} = request.body;
        
        const clientRepository = new ClientRepository(conn);
        await clientRepository.create(first_name, last_name, cpf, phone, user_id, birth_date);

        return response.status(201).json({ message: "Client created!" });
    }

    async findAll(request: Request, response: Response) {
        
        const clientRepository = new ClientRepository(conn);
        const clients = await clientRepository.findAll();

        return response.json({ clients });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const clientRepository = new ClientRepository(conn);
        const client = await clientRepository.findById(parseInt(id));

        return response.json({ client });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            cpf: Yup.string().required(),
            phone: Yup.string().required(),
            user_id: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { first_name, last_name, cpf, phone, user_id, birth_date } = request.body;
        const { id } = request.params;
        
        const clientRepository = new ClientRepository(conn);
        const client = await clientRepository.update(parseInt(id), first_name, last_name, cpf, phone, user_id, birth_date);

        return response.status(201).json({ client });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const clientRepository = new ClientRepository(conn);
        const client = await clientRepository.delete(parseInt(id));

        return response.json({ client });
    }
}