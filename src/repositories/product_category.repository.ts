import { Knex } from 'knex';

export class ProductCategoryRepository {
  constructor(private readonly knex: Knex) {}

  async create(product_id: number, category_id: number) {
    return await this.knex('product_categories').insert({ product_id, category_id });
  }

  async findByCategoryId(category_id: number) {
    return await this.knex('product_categories').where({ category_id }).select('product_id');
  }

  async findByProductId(product_id: number) {
    return await this.knex('product_categories').where({ product_id }).select('category_id');;
  }

  async findByProductCategoryId(product_id: number, category_id: number) {
    return await this.knex('product_categories').where({ product_id }).andWhere({ category_id }).first().select('id');;
  }

  async delete(id: number) {
    return await this.knex('product_categories').where({ id }).del();
  }
}