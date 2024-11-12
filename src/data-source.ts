import "reflect-metadata";
import {DataSource, DataSourceOptions} from "typeorm";
import { config } from "./config/config";
import {SeederOptions} from "typeorm-extension";
import MainSeeder from "./migration/seed/main.seeder";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: "express_social_app",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
  seedTracking: false,
  factories: ["src/factories/**/*.ts"],
  seeds: [MainSeeder],
}

export const AppDataSource = new DataSource(options);
