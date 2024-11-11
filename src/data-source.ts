import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config/config";

export const AppDataSource = new DataSource({
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
  subscribers: []
});
