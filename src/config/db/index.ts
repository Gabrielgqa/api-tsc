import Knex from 'knex';
import config from '../../../knexfile';

const database = Knex(config);

export default database;