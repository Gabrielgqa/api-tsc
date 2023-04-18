import { Knex } from 'knex';

export class ClientRepository {
  constructor(private readonly knex: Knex) {}

  async create(first_name: string, last_name: string, cpf: string, phone: string, user_id: number, birth_date?: Date) {
    return await this.knex('clients').insert({ first_name, last_name, cpf, phone, user_id, birth_date });
  }

  async findAll() {
    return await this.knex('clients').select('*');
  }

  async findById(id: number) {
    return await this.knex('clients').where({ id }).first();
  }

  async update(id: number, first_name: string, last_name: string, cpf: string, phone: string, user_id: number, birth_date?: Date) {
    return await this.knex('clients').where({ id }).update({ first_name, last_name, cpf, phone, user_id, birth_date });
  }

  async delete(id: number) {
    return await this.knex('clients').where({ id }).del();
  }
}