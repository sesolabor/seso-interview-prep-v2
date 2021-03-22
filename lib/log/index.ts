import debug from "debug";
const isServer = typeof window === "undefined";

const bindLog = (d, logger) => {
  d.log = logger;
  return d;
};

const logger = {
  log: bindLog(debug(`seso:${isServer ? "server" : "client"}:log`), console.log.bind(console)),
  info: bindLog(debug(`seso:${isServer ? "server" : "client"}:info`), console.info.bind(console)),
  warn: bindLog(debug(`seso:${isServer ? "server" : "client"}:warn`), console.warn.bind(console)),
  error: bindLog(debug(`seso:${isServer ? "server" : "client"}:error`), console.error.bind(console)),
};

// Todo: Implement better log scoping here.
debug.enable("seso:*");

export default logger;
