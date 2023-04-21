import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('shopping_carts', function (table) {
        table.increments('id').primary();
        table.integer('cart_id').notNullable().references('id').inTable('user_carts');
        table.integer('product_id').notNullable().references('id').inTable('products');
        table.integer('quantity').notNullable();
        table.double('sub_price');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('shopping_carts');
}

