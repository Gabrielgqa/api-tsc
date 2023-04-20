import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_categories', function (table) {
        table.increments('id').primary();
        table.integer('product_id').notNullable().references('id').inTable('products');
        table.integer('category_id').notNullable().references('id').inTable('categories');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('product_categories');
}

