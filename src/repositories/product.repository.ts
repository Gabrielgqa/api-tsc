import { Knex } from 'knex';

export class ProductRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string, price: number, stock: number) {
    return await this.knex('products').insert({ name, description, price, stock });
  }

  async findAll() {
    return await this.knex('products').select('*');
  }

  async findById(id: number) {
    return await this.knex('products').where({ id }).first();
  }

  async update(id: number, name: string, description: string, price: number, stock: number, available: boolean, highlight: boolean, promotion: boolean, promotional_price?: number) {
    return await this.knex('products').where({ id }).update({ name, description, price, stock, available, highlight, promotion, promotional_price });
  }

  async delete(id: number) {
    return await this.knex('products').where({ id }).del();
  }
}