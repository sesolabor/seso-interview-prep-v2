import config from "config";
import path from "path";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import entities from "./entities";

const migrationsDir = "migrations";
const entitiesDir = "repositories/entities";

const options: ConnectionOptions = {
  type: "postgres",
  entities: Object.values(entities),
  synchronize: config.get("postgres.synchronize"),
  name: config.get("postgres.connectionName"),
  url: config.get("postgres.connectionString"),
  cli: { migrationsDir, entitiesDir },
  logging: false,
  migrations: ["test"].includes(process.env.NODE_ENV)
    ? // Note: Sidestep jest loading migrations (poorly)
      // `SyntaxError: Cannot use import statement outside a module`
      undefined
    : [path.join(__dirname, "..", "/migrations/**/*.ts")],
  namingStrategy: new SnakeNamingStrategy(),
};

// Weird bug. See: https://github.com/typeorm/typeorm/issues/4068#issuecomment-616964197
module.exports = options;
export default options;
