import { Knex } from 'knex';

export class ProductRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string, price: number, stock: number, available: boolean, highlight: boolean) {
    return await this.knex('products').insert({ name, description, price, stock, available, highlight });
  }

  async findAll() {
    return await this.knex('products').select('*');
  }

  async findById(id: number) {
    return await this.knex('products').where({ id }).first();
  }

  async update(id: number, name: string, description: string, price: number, stock: number, available: boolean, highlight: boolean) {
    return await this.knex('products').where({ id }).update({ name, description, price, stock, available, highlight });
  }

  async delete(id: number) {
    return await this.knex('products').where({ id }).del();
  }
}