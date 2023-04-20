import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rates', function (table) {
        table.increments('id').primary();
        table.integer('product_id').notNullable().references('id').inTable('products');
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.integer('points').notNullable();
        table.string('comment');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rates');
}

