import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('clients', function (table) {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('cpf').notNullable().unique();
        table.string('phone').notNullable().unique();
        table.string('birth_date');
        table.integer('user_id').notNullable().unique().references('id').inTable('users');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('clients');
}

