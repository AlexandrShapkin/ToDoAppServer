import { ValidationError } from "express-validator";

/**
 * @extends {Error}
 */
export interface ApiError extends Error {
  status: number;
  errors: ValidationError[];
}

/**
 * Check `object` is instance of `ApiError`
 * @param {any} object
 * @returns {boolean}
 */
export function instanceOfApiError(object: any): object is ApiError {
  let isApiError = true;
  isApiError = "status" in object;
  isApiError = "errors" in object;

  return isApiError;
}

/**
 * User Unauthorized Error
 * @returns {ApiError}
 */
export function UnauthorizedError(): ApiError {
  const err: ApiError = {
    status: 400,
    message: "Пользователь не авторизован",
    errors: [],
    name: "User Unauthorized Error",
  };
  return err;
}

/**
 * Bad Reques Error
 * @param {string} message - error message
 * @param {ValidationError[]} errors - array of errors
 * @returns {ApiError}
 */
export function BadRequest(message: string, errors: ValidationError[] = []): ApiError {
  const err: ApiError = {
    status: 400,
    message: message,
    errors: errors,
    name: "Bad Request Error",
  };
  return err;
}

/**
 * Task Update Error
 * @returns {ApiError}
 */
export function UpdateError(): ApiError {
  const err: ApiError = {
    status: 500,
    message: "Ошибка обновления задачи",
    errors: [],
    name: "Task Update Error"
  };
  return err;
}