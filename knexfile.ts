import path from 'path';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB_DATABASE,
    port: 5432
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'infra', 'config', 'db', 'migrations')
  },
};

export default config;