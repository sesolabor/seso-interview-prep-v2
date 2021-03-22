import type { SesoApiError } from "./types";
const bestFetch = async <ReturnType>(fetchPath: string, fetchOptions: RequestInit): Promise<ReturnType> => {
  const response = await fetch(fetchPath, fetchOptions);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (response.status >= 400 && response.status < 600) {
    if (isJson) {
      return response.json().then((e) => {
        // Errors should mirror shape of express-validator errors.
        const err: SesoApiError = Object.assign(new Error(e.message), {
          data: e.data,
          error: e.error,
          responseStatus: response.status,
        });

        throw err;
      });
    } else {
      return response.text().then((text) => {
        // Errors should mirror shape of express-validator errors.
        const err = new Error(text) as Error & {
          responseStatus: number;
          error: string;
        };

        err.responseStatus = response.status;
        err.error = text;

        throw err;
      });
    }
  }
  return isJson ? response.json() : response.text();
};

export default bestFetch;
