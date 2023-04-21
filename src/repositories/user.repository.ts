import { Knex } from 'knex';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private readonly knex: Knex) {}

  async create(email: string, password: string) {
    const user = await this.knex('users').insert({ email, password }).returning('*');
    return await this.formatEntitie(user);
  }

  async findAll() {
    return await this.knex('users').select('*');
  }

  async findById(id: number) {
    return await this.knex('users').where({ id }).first();
  }

  async findByCredentials(email: string){
    return await this.knex('users').where({ email }).first();
  }

  async update(id: number, email: string, password: string, is_admin?: boolean) {
    return await this.knex('users').where({ id }).update({ email, password, is_admin });
  }

  async delete(id: number) {
    return await this.knex('users').where({ id }).del();
  }

  async formatEntitie(user: any[]): Promise<User>  {
    const entitieUser = new  User();
    entitieUser.id = user[0].id;
    entitieUser.email = user[0].email;
    entitieUser.password = user[0].password;
    entitieUser.is_admin = user[0].is_admin;

    return entitieUser;
  }
}