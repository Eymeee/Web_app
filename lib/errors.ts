export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export function apiError(code: string, message: string, details?: unknown): ApiError {
  return { code, message, details };
}
