import type { NextApiRequest, NextApiResponse } from "next";
import type { AppContext } from "next/app";
import type { AppTreeType } from "next/dist/next-server/lib/utils";
import type { NextRouter } from "next/router";
import type { IRepositories } from "@/repositories/types";
import type User from "@/repositories/entities/user";
import type Enterprise from "@/repositories/entities/enterprise";
import servicesConstructor from "@/services";

export type RequestMethods = "GET" | "PUT" | "POST" | "DELETE";
export type SesoAuthToken = {
  id: number | null;
  email: string | null;
  impersonatingUserId: number | null;
};
export type IExecutionContext = {
  user: User | null;
  enterprise: Enterprise | null;
  apiUrl: string;
  apiMethod: string;
  requestId: string;
};
export type SesoNextApiResponse = Omit<NextApiResponse, "json">;
export type SesoNextApiRequest = Omit<NextApiRequest, "body"> & {
  services: ReturnType<typeof servicesConstructor>;
  repositories: IRepositories;
  ec: IExecutionContext;
  originalUrl?: string;
};
export type NextCallbackSignature = (error?: any) => void;

// See: https://stackoverflow.com/questions/49128621/how-to-specify-type-returned-with-express-response
// Powers typing response shape of a route - we can then use that type on the client
// to type the signature of ApiClient methods.
export type TypedSesoNextApiResponse<T> = SesoNextApiResponse & {
  json(data: UnwrapPromiseType<T>): void;
};
export type TypedSesoNextApiRequest<T, Q = void, P = any> = SesoNextApiRequest & {
  body: T;
  query: Q;
  params: P;
};

export type AsyncReturnType<T extends (...args: any[]) => any> = UnwrapPromiseType<ReturnType<T>>;
// Pulls type out of Promise<type>
// See: https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise
export type UnwrapPromiseType<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;
/**
 * Props that are provided to the _app:getInitialProps method
 *
 * Those props are provided by Next.js framework, and we have no control over it
 */
// https://github.com/UnlyEd/next-right-now/blob/master/src/types/AppInitialProps.ts
export interface AppInitialProps extends AppContext {
  AppTree: AppTreeType;
}
// https://github.com/UnlyEd/next-right-now/blob/master/src/types/AppRenderProps.ts
export declare type AppRenderProps = {
  err?: Error; // Only defined if there was an error
  Component?: Function; // eslint-disable-line @typescript-eslint/no-explicit-any
  pageProps?: Function; // eslint-disable-line @typescript-eslint/no-explicit-any
  router?: NextRouter;
};
