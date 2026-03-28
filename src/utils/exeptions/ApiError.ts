import type { ValidationError } from "zod-validation-error";

type ApiErrors = ValidationError | string[] | null;

class ApiError extends Error {
  public status?: number;
  public errors: ApiErrors;

  constructor(message: string, status: number, errors: ApiErrors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnAuthorized() {
    throw new ApiError("Пользователь не авторизован", 401, null);
  }

  static BadRequest(message: string, errors: ApiErrors = null) {
    throw new ApiError(message, 400, errors);
  }

  static NotFound(message: string) {
    throw new ApiError(message, 404, null);
  }
}

export default ApiError;
