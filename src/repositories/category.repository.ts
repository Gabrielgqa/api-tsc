import { Knex } from 'knex';
import { Category } from '../entities/Category';

export class CategoryRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string) {
    const category = await this.knex('categories').insert({ name, description });
    return await this.formatEntitie(category);
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

  async formatEntitie(category: any[]): Promise<Category>  {
    const entitieCategory = new  Category();
    entitieCategory.id = category[0].id;
    entitieCategory.name = category[0].name;
    entitieCategory.description = category[0].description;

    return entitieCategory;
  }
}