import { Knex } from 'knex';

export class UserRepository {
  constructor(private readonly knex: Knex) {}

  async create(email: string, password: string, is_admin?: boolean) {
    return await this.knex('users').insert({ email, password, is_admin });
  }

  async findAll() {
    return await this.knex('users').select('*');
  }

  async findById(id: number) {
    return await this.knex('users').where({ id }).first();
  }

  async update(id: number, email: string, password: string, is_admin?: boolean) {
    return await this.knex('users').where({ id }).update({ email, password, is_admin });
  }

  async delete(id: number) {
    return await this.knex('users').where({ id }).del();
  }
}