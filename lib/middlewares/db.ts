import config from "config";
import { getConnectionManager } from "typeorm";

import ormConfig from "@/repositories/ormconfig";

const connectionName = config.get("postgres.connectionName");

// Inspired by: https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383
let connectionManager;
export async function ensureConnectionMiddleware(req, res, next) {
  connectionManager = connectionManager || getConnectionManager();

  if (connectionManager.has(connectionName)) {
    req.db = connectionManager.get(connectionName);
    req.db.isConnected || (await req.db.connect());

    // Powers hot-reloading in development.
    if (["development", "test"].includes(process.env.NODE_ENV)) {
      await updateConnectionEntities(req.db, ormConfig.entities);
    }
  } else {
    req.db = await connectionManager.create(ormConfig).connect();
  }

  return next();
}

async function updateConnectionEntities(connection, entities) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  connection.options.entities = entities;
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

function entitiesChanged(prevEntities, newEntities) {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}
