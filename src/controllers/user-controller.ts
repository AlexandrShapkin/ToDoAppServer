import { Request, Response, NextFunction } from "express";
import * as UserService from "../service/user-service";
import { validationResult, Result, ValidationError } from "express-validator";
import { BadRequest } from "../errors/api-error";
import { UserDataDto } from "../dtos/user-data-dto";
import { AccessDataDto } from "../dtos/access-data-dto";

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
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return next(BadRequest("Ошибка валидации", errors.array()));
    }

    const { username, password }: UserDataDto = req.body;

    const userData = await UserService.registration(username, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    
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
    const { username, password }: UserDataDto = req.body;
    const userData: AccessDataDto = await UserService.login(username, password);
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
    const { refreshToken }: { refreshToken: string } = req.cookies;
    const token: string = await UserService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (err) {
    next(err);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> {
  try {
    const { refreshToken }: { refreshToken: string } = req.cookies;
    const userData: AccessDataDto = await UserService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (err) {
    next(err);
  }
}
