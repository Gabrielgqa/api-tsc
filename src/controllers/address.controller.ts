import { Request, Response } from 'express';
import * as Yup from 'yup';
import { AddressRepository } from '../repositories/address.repository';
import conn from '../config/db/index';

export default class AddressController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            address: Yup.string().required(),
            number: Yup.string().required(),
            district: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            client_id: Yup.number().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { address, number, district, city, state, client_id, complement } = request.body;
        
        const addressRepository = new AddressRepository(conn);
        await addressRepository.create(address, number, district, city, state, client_id, complement);

        return response.status(201).json({ message: "Address created!" });
    }

    async findAll(request: Request, response: Response) {
        
        const addressRepository = new AddressRepository(conn);
        const adres = await addressRepository.findAll();

        return response.json({ addresses: adres });
    }

    async find(request: Request, response: Response) {

        const { id } = request.params;
        
        const addressRepository = new AddressRepository(conn);
        const adres = await addressRepository.findById(parseInt(id));

        return response.json({ address: adres });
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            address: Yup.string().required(),
            number: Yup.string().required(),
            district: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required()
        });
      
        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Field validation erros.' });
        }

        const { address, number, district, city, state, complement } = request.body;
        const { id } = request.params;
        
        const addressRepository = new AddressRepository(conn);
        const adres = await addressRepository.update(parseInt(id), address, number, district, city, state, complement);

        return response.status(200).json({ address: adres });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        
        const addressRepository = new AddressRepository(conn);
        const adres = await addressRepository.delete(parseInt(id));

        return response.status(200).json({ address: adres });
    }
}