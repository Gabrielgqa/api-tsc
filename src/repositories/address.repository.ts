import { Knex } from 'knex';

export class AddressRepository {
  constructor(private readonly knex: Knex) {}

  async create(address: string, number: string, district: string, city: string, state: string, client_id: number, complement?: string) {
    return await this.knex('addresses').insert({ address, number, district, city, state, client_id, complement });
  }

  async findAll() {
    return await this.knex('addresses').select('*');
  }

  async findById(id: number) {
    return await this.knex('addresses').where({ id }).first();
  }

  async update(id: number, address: string, number: string, district: string, city: string, state: string, client_id: number, complement?: string) {
    return await this.knex('addresses').where({ id }).update({ address, number, district, city, state, client_id, complement });
  }

  async delete(id: number) {
    return await this.knex('addresses').where({ id }).del();
  }
}