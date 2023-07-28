import { env } from "./env";
import { DataSource } from "typeorm";
const { database } = env;
export default new DataSource({
  type: "mysql",
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  synchronize: true,
  connectTimeout: 20000,
  acquireTimeout: 20000,
  legacySpatialSupport:false,
  entities: [__dirname + "/../entities/*{.ts,.js}"],
  charset:'utf8mb4'
});