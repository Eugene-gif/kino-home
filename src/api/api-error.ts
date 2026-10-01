type ApiErrorContext = {
  service: string;
  status: number;
  method: string;
  path: string;
};

export class ApiError extends Error {
  readonly service: string;
  readonly status: number;
  readonly method: string;
  readonly path: string;

  constructor({ service, status, method, path }: ApiErrorContext) {
    super(`${service.toUpperCase()} request failed: HTTP ${status}`);
    this.name = 'ApiError';
    this.service = service;
    this.status = status;
    this.method = method;
    this.path = path;
  }
}
