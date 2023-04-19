import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.double('price').notNullable();
        table.integer('stock').notNullable();
        table.boolean('available').notNullable();
        table.boolean('highlight').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products');
}

