import { Knex } from 'knex';
import { ShoppingCart } from '../entities/ShoppingCart';

export class ShoppingCartRepository {
  constructor(private readonly knex: Knex) {}

  async create(cart_id: number, product_id: number, quantity: number, sub_price: number): Promise<ShoppingCart> {
    const shopping_cart = await this.knex('shopping_carts').insert({ cart_id, product_id, quantity, sub_price }).returning('*');
    return await this.formatEntitie(shopping_cart);
  }

  async findByCardId(card_id: number) {
    return await this.knex('shopping_carts').where({ card_id });
  }

  async findById(id: number): Promise<ShoppingCart> {
    const shopping_cart = await this.knex('shopping_carts').where({ id }).first();
    return await this.formatEntitie(shopping_cart);
  }

  async update(id: number, quantity: number, sub_price: number) {
    return await this.knex('shopping_carts').where({ id }).update({ id, quantity, sub_price });
  }

  async delete(id: number) {
    return await this.knex('shopping_carts').where({ id }).del();
  }

  async formatEntitie(shopping_cart: any[]): Promise<ShoppingCart>  {
    const entitieShoppingCart = new  ShoppingCart();
    entitieShoppingCart.id = shopping_cart[0].id;
    entitieShoppingCart.cart_id = shopping_cart[0].cart_id;
    entitieShoppingCart.product_id = shopping_cart[0].product_id;
    entitieShoppingCart.quantity = shopping_cart[0].quantity;
    entitieShoppingCart.sub_price = shopping_cart[0].sub_price;

    return entitieShoppingCart;
  }
}