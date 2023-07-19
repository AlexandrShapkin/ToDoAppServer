import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import { instanceOfApiError } from "../errors/api-error";

/**
 * Error middleware
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response<any, Record<string, any>>}
 */
export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> {
  console.log(err);
  if (instanceOfApiError(err)) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка", errors: [] });
}
