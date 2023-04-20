import { Knex } from 'knex';
import { Rate } from '../entities/Rate';

export class RateRepository {
  constructor(private readonly knex: Knex) {}

  async create(product_id: number, user_id: number, points: number, comment?: string): Promise<Rate> {
    const rate = await this.knex('rates').insert({ product_id, user_id, points, comment }).returning('*');
    return await this.formatEntitie(rate);
  }

  async findAll() {
    return await this.knex('rates').select('*');
  }

  async update(id: number, points?: number, comment?: string) {
    return await this.knex('rates').where({ id }).update({ points, comment  });
  }

  async delete(id: number) {
    return await this.knex('rates').where({ id }).del();
  }

  async formatEntitie(rate: any[]): Promise<Rate>  {
    const entitieRate = new  Rate();
    entitieRate.id = rate[0].id;
    entitieRate.product_id = rate[0].product_id;
    entitieRate.user_id = rate[0].user_id;
    entitieRate.points = rate[0].points;
    entitieRate.comment = rate[0].comment;

    return entitieRate;
  }
}