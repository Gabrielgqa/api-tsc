import { Knex } from 'knex';

export class CategoryRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string) {
    return await this.knex('categories').insert({ name, description });
  }

  async findAll() {
    return await this.knex('categories').select('*');
  }

  async findById(id: number) {
    return await this.knex('categories').where({ id }).first();
  }

  async update(id: number, name: string, description: string) {
    return await this.knex('categories').where({ id }).update({ name, description });
  }

  async delete(id: number) {
    return await this.knex('categories').where({ id }).del();
  }
}