import next from "next";
import express from "express";
import { parse } from "url";
import { loadEnvConfig } from "@next/env";

const dev = ["development", "test"].includes(process.env.NODE_ENV);
loadEnvConfig(".", dev);

/* Import app files after loading env above */
import forceSSL from "@/lib/middlewares/force-ssl";
import usersCreateUserAndEnterprise from "@/pages/api/users/create-user-and-enterprise";
import users from "@/pages/api/users";
import usersLogin from "@/pages/api/users/login";
import log from "@/lib/log";
import conf from "./next.config.js";

const port = process.env.PORT || 3000;
const nextJsQ = (handler) => async (req, res, next) => {
  // Mirror the query object behavior of nextjs.
  req.query = Object.assign(req.query, req.params);
  return handler(req, res, next);
};
export const startServer = async (prepareClient = false, _passedPort = port) => {
  const passedPort = parseInt(String(_passedPort), 10);
  const server = express();
  const app = next({ dev, conf });
  const nextJsHandler = app.getRequestHandler();

  return new Promise((res, rej) => {
    server.use(forceSSL());
    server.use(express.json());
    server.use("/api/users/login", nextJsQ(usersLogin));
    server.use("/api/users/create-user-and-enterprise", nextJsQ(usersCreateUserAndEnterprise));
    server.use("/api/users", nextJsQ(users));
    server.use((req, res, next) => nextJsHandler(req, res, parse(req.url, true)));
    server.listen(passedPort, (err) => {
      if (err) throw err;
      (prepareClient ? app.prepare() : Promise.resolve()).then(() => {
        log.info(`Seso Server Started. Port: ${port}`);
        return res(server);
      });
    });
  });
};

if (require.main === module) startServer(!!process.argv[4], process.argv[5]); // When being ran directly, like a cli or start script
