import { Request, Response, NextFunction } from "express";
import * as UserService from "../service/user-service";
import { validationResult } from "express-validator";
import { BadRequest } from "../errors/api-error";

/**
 * Registration endpoint handler.
 * @param {Request} req express Request
 * @param {Response} res express Response
 * @param {NextFunction} next express NextFunction
 * @returns {Promise<Response<any, Record<string, any>>>} Response JSON
 * `{
 *    accessToken: string;
 *    refreshToken: string;
 *    userDto: UserDto;
 *  }`
 */
export async function registration(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(BadRequest("Ошибка валидации", errors.array()));
    }

    const { username, password } = req.body;

    const userData = await UserService.registration(username, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log(userData);
    return res.json(userData);
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> {
  try {
    const { username, password } = req.body;
    const userData = await UserService.login(username, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (err) {
    next(err);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> {
  try {
    const { refreshToken } = req.cookies;
    const token = await UserService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (err) {
    next(err); 
  }
}
