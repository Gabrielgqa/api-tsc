import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('purchases', function (table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.integer('cupon_id').references('id').inTable('cupons');
        table.float('amount').notNullable();
        table.string('payment_type').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('purchases');
}

