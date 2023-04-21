import { Knex } from 'knex'; 

export class UserCartRepository {
  constructor(private readonly knex: Knex) {}

  async create(user_id: number) {
    return await this.knex('user_carts').insert({ user_id });
  }
}