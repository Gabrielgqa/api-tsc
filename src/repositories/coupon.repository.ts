import { Knex } from 'knex';
import { Coupon } from '../entities/Coupon';

export class CouponRepository {
  constructor(private readonly knex: Knex) {}

  async create(name: string, description: string, percentage: number) {
    const coupon = await this.knex('coupons').insert({ name, description, percentage }).returning('*');
    return await this.formatEntitie(coupon);
  }

  async findAll() {
    return await this.knex('coupons').select('*');
  }

  async findById(id: number) {
    return await this.knex('coupons').where({ id }).first();
  }

  async update(id: number, name: string, description: string, percentage: number, active?: boolean) {
    return await this.knex('coupons').where({ id }).update({ name, description, percentage, active });
  }

  async delete(id: number) {
    return await this.knex('coupons').where({ id }).del();
  }

  async formatEntitie(coupon: any[]): Promise<Coupon>  {
    const entitieCoupon = new  Coupon();
    entitieCoupon.id = coupon[0].id;
    entitieCoupon.name = coupon[0].name;
    entitieCoupon.description = coupon[0].description;
    entitieCoupon.percentage = coupon[0].percentage;
    entitieCoupon.active = coupon[0].active;

    return entitieCoupon;
  }
}