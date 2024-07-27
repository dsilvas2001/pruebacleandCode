import { DataSource } from "typeorm";
import { envs } from "../../config";
import { Client } from "../../data/postgres/entities/client.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true,
  entities: ["src/data/postgres/entities/*.ts"],
  // entities: [Client],
  logging: false,
  ssl: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized!");
  })
  .catch((err) => {
    console.error("Error initializing dataSource:", err);
  });

export { AppDataSource };
