import apiClient from "./index";
export type RawApiClient = typeof apiClient;
export type ApiClientMethods = keyof RawApiClient;
export type SesoApiError = Error & { error: string; message: string; data: any; responseStatus: number };
