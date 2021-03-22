import queryString from "query-string";
import bestFetch from "./best-fetch";
import type { RequestMethods } from "@/lib/types";

type ConfigBlob = {
  path: string;
  auth: boolean;
  method: RequestMethods;
};

export function apiMethodConstructor<ParamsType, ReturnType>(confBlob: ConfigBlob) {
  return (params: ParamsType, authToken: string): Promise<ReturnType> => {
    return apiClientMethod<ParamsType, ReturnType>(confBlob, params, authToken);
  };
}

const trimSlash = (s: string) => (s.startsWith("/") ? s.slice(1) : s);

function apiClientMethod<ParamsType, ReturnType>(
  confBlob: ConfigBlob,
  params: ParamsType,
  authToken: string
): Promise<ReturnType> {
  // Note: Interpolates strings like `foo/bar/:paramThing` with blobs like { paramThing:123, xxx: "z", ... }
  // and returns the params that are *not* interpolated.
  // It will also raise an exception if the params blob lacks the required param to interpolate into the string
  const { interpolatedPathString, remainingParams } = interpolateParams(confBlob.path, params);
  const isGet = confBlob.method === "GET";
  const maybeBody = isGet
    ? {} // no body
    : {
        body: typeof remainingParams === "string" ? remainingParams : JSON.stringify(remainingParams),
      };

  const pathMaybeWithQueryParams =
    isGet && remainingParams
      ? // http://host.com/interpolated/path?query=1&params=2
        `/${trimSlash(interpolatedPathString)}${queryString.stringify(remainingParams)}`
      : `/${trimSlash(interpolatedPathString)}`;

  const fetchOptions = Object.assign(
    { method: confBlob.method, cors: "cors" },
    {
      headers: Object.assign(authToken ? { Authorization: `Bearer ${authToken}` } : {}, {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }),
    },
    maybeBody
    // Typing for this is rough.
  ) as RequestInit;

  return bestFetch(pathMaybeWithQueryParams, fetchOptions);
}

// See: https://github.com/moroshko/interpolate-params
// Interpolates params like `/foo/:bar/:baz` with { bar: "zz", baz: 1} -> /foo/zz/1
const paramRegex = /:[_a-zA-Z]+/g;
function interpolateParams<ParamsType>(stringToInterpolate: string, params: ParamsType) {
  if (typeof stringToInterpolate !== "string") {
    throw new Error("'stringToInterpolate' must be a string");
  }

  if (typeof params !== "object") {
    throw new Error("'params' must be an object");
  }

  let isMatch = true;
  const remainingParams = Object.assign({}, params);
  const interpolatedPathString = stringToInterpolate.replace(paramRegex, (paramWithColon) => {
    const param = paramWithColon.slice(1);

    if (param in params) {
      const value = params[param];

      if (value === null) {
        isMatch = false;
        return "";
      }

      delete remainingParams[param];

      return value;
    }
    // Looking for route param (/:param) but didnt find it -> Err.
    throw new Error(`Route param: [${param}] not present in param blob: ${JSON.stringify(params)}`);
  });

  if (!isMatch)
    throw new Error(`Unable to interpolate params. Path: ${stringToInterpolate}. Params: ${JSON.stringify(params)}`);

  return {
    interpolatedPathString,
    remainingParams,
  };
}
