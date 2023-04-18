import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('addresses', function (table) {
        table.increments('id').primary();
        table.string('address').notNullable();
        table.string('number').notNullable();
        table.string('complement');
        table.string('district').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.integer('client_id').notNullable().references('id').inTable('clients');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('addresses');
}

