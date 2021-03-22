import { validationResult } from "express-validator";
import { compose } from "compose-middleware";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import type { Middleware, RequestHandler } from "next-connect";
import nc from "next-connect";
import Boom from "@hapi/boom";

import type {
  SesoNextApiRequest,
  SesoNextApiResponse,
  NextCallbackSignature,
  TypedSesoNextApiRequest,
  TypedSesoNextApiResponse,
} from "@/lib/types";
import log from "@/lib/log";
import executionContextMiddleware from "./execution-context";
import { attachServicesMiddleware } from "./services";
import { ensureConnectionMiddleware } from "./db";

function paramValidationMiddleware(
  req: TypedSesoNextApiRequest<any>,
  res: TypedSesoNextApiResponse<any>,
  next: NextCallbackSignature
): void {
  // Powers express-validator.
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  throw Boom.badRequest("Validation Failure", { errors: errors.array() });
}

function onError(err, req, res) {
  if (Boom.isBoom(err)) {
    const { data } = err;
    const { statusCode, error, message } = err.output.payload;
    log.warn(`Boom Error! Status Code: ${statusCode}. Message: ${message}. Errors: ${JSON.stringify(data)}`);
    return res.status(statusCode).json({ error, message, data });
  }
  if (err instanceof EntityNotFoundError) {
    log.warn(`EntityNotFoundError! Status Code: 400. Message: ${err.message}. Errors: null`);
    return res.status(404).json({ error: "Not found.", message: err.message, data: null });
  }
  log.error(`Fatal Error! Message: ${err.mesage}. Stack Trace: ${err.stack}`);
  return res.status(500).end();
}

export const ECMiddleware = compose([ensureConnectionMiddleware, attachServicesMiddleware, executionContextMiddleware]);

const noopMiddleware = (req, res, next) => next();
export const ezRoute = (middleware: any = noopMiddleware) => {
  return nc<SesoNextApiRequest, SesoNextApiResponse>({ onError })
    .use(ensureConnectionMiddleware)
    .use(attachServicesMiddleware)
    .use(executionContextMiddleware)
    .use(middleware)
    .use(paramValidationMiddleware);
};

export const ezHandler = <T, S>({
  handler,
  validation,
}: {
  handler: RequestHandler<T, S>;
  validation?: Middleware<T, S>[];
}): RequestHandler<T, S> => {
  const router = nc<T, S>({ onError });

  if (validation && validation.length) {
    router.use(...validation).use(paramValidationMiddleware);
  }

  // @ts-ignore - I believe the type of `router.use` is wrong currently. Keeping this type force for now.
  return router.use(handler);
};
