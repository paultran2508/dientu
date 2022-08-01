import 'reflect-metadata'
import { DataSource } from "typeorm"
import entities from '../entities';

interface DbVar {
  username: string,
  password: string,
  host: string,
  database: string
}

export const AppConnectPostgres = async ({ username, password, host, database }: DbVar) => {
  const main = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username,
    password,
    database,
    synchronize: true,
    logging: true,
    entities

    // subscribers: [],
    // migrations: [],
  })

  return await main.initialize()
}
