import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_carts', function (table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_carts');
}

