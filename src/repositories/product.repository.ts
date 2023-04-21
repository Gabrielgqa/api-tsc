import { Knex } from 'knex';
import { Product } from '../entities/Product';

export class ProductRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string, price: number, stock: number): Promise<Product> {
    const produt = await this.knex('products').insert({ name, description, price, stock }).returning('*');
    return await this.formatEntitie(produt);
  }

  async findAll() {
    return await this.knex('products').select('*');
  }

  async findById(id: number): Promise<Product> {
    const produt =  await this.knex('products').where({ id }).first();
    return await this.formatEntitie(produt);
  }

  async update(id: number, name: string, description: string, price: number, stock: number, available: boolean, highlight: boolean, promotion: boolean, promotional_price?: number) {
    return await this.knex('products').where({ id }).update({ name, description, price, stock, available, highlight, promotion, promotional_price });
  }

  async delete(id: number) {
    return await this.knex('products').where({ id }).del();
  }

  async formatEntitie(product: any[]): Promise<Product>  {
    const entitieProduct = new  Product();
    entitieProduct.id = product[0].id;
    entitieProduct.name = product[0].name;
    entitieProduct.price = product[0].price;
    entitieProduct.stock = product[0].stock;

    return entitieProduct;
  }
}